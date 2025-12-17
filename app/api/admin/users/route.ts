import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import User from "@/models/User";

export async function GET() {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const users = await User.find().select(
    "name email username role createdAt"
  );

  return NextResponse.json({ users });
}
