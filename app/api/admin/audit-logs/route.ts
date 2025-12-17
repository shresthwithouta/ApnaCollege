import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import AuditLog from "@/models/AuditLog";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connect();

  const logs = await AuditLog.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .populate("performedBy", "username")
    .populate("targetUser", "username");

  return NextResponse.json({ logs });
}
