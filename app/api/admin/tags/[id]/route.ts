import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import Tag from "@/models/Tags";
import User from "@/models/User";
import AuditLog from "@/models/AuditLog";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  await connect();

  await User.updateMany(
    { tags: id },
    { $pull: { tags: id } }
  );

  const deleted = await Tag.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { error: "Tag not found" },
      { status: 404 }
    );
  }

  await AuditLog.create({
    action: "DELETE_TAG",
    actorId: session.user.id,
    actorEmail: session.user.email ?? "unknown",
    targetUserId: session.user.id,
    targetEmail: session.user.email ?? "unknown",
  });

  return NextResponse.json({ success: true });
}
