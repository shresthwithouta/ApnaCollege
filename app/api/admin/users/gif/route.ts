import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { connect } from "@/lib/db";
import User from "@/models/User";

export async function PATCH(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId, allow } = await req.json();

  await connect();
  await User.findByIdAndUpdate(userId, {
    gifAllowed: allow,
  });

  return NextResponse.json({ success: true });
}
