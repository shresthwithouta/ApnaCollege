import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import Tag from "@/models/Tags";

export async function GET() {
  const session = await getServerSession(authOptions);
  await connect();

  const query =
    session?.user.role === "admin"
      ? {}
      : { isAdminOnly: false };

  const tags = await Tag.find(query).sort({ name: 1 });

  return NextResponse.json({ tags });
}
