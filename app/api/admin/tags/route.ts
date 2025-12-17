import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import Tag from "@/models/Tags";
import AuditLog from "@/models/AuditLog";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connect();

  const { name, visibility } = await req.json();

  const tag = await Tag.create({ name, visibility });

  await AuditLog.create({
    action: "CREATE_TAG",
    actorId: session.user.id,
    actorEmail: session.user.email,
    targetUserId: session.user.id,
    targetEmail: session.user.email,
  });

  return NextResponse.json({ tag });
}

export async function GET() {
  await connect();
  const tags = await Tag.find().lean();
  return NextResponse.json({ tags });
}
