import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { connect } from "@/lib/db";
import User from "@/models/User";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ REQUIRED in Next.js 16

  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  if (admin._id.toString() === id) {
    return NextResponse.json(
      { error: "You cannot change your own role" },
      { status: 400 }
    );
  }

  await connect();

  const body = await req.json();
  const { role } = body as { role?: "admin" | "user" };

  if (role !== "admin" && role !== "user") {
    return NextResponse.json(
      { error: "Invalid role" },
      { status: 400 }
    );
  }

  await User.findByIdAndUpdate(id, { role });

  return NextResponse.json({ success: true });
}
