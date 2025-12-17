import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import User from "@/models/User";
import AuditLog from "@/models/AuditLog";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId, newRole } = await req.json();

  if (!userId || !["admin", "user"].includes(newRole)) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  await connect();

  const targetUser = await User.findById(userId);
  if (!targetUser) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  
  if (
    session.user.id === userId &&
    newRole === "user"
  ) {
    return NextResponse.json(
      { error: "You cannot demote yourself" },
      { status: 400 }
    );
  }

  
  if (
    targetUser.role === "admin" &&
    newRole === "user"
  ) {
    const adminCount = await User.countDocuments({
      role: "admin",
    });

    if (adminCount <= 1) {
      return NextResponse.json(
        { error: "At least one admin is required" },
        { status: 400 }
      );
    }
  }

  const oldRole = targetUser.role;
  targetUser.role = newRole;
  await targetUser.save();


  await AuditLog.create({
    action: "UPDATE_USER_ROLE",
    actorId: session.user.id,
    actorEmail: session.user.email,
    targetUserId: targetUser._id,
    targetEmail: targetUser.email,
  });

  return NextResponse.json({ success: true });
}
