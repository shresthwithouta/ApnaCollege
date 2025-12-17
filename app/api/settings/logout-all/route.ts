import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import User from "@/models/User";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connect();

  await User.findByIdAndUpdate(session.user.id, {
    $inc: { tokenVersion: 1 },
  });

  return NextResponse.json({ success: true });
}
