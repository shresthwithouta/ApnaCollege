import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import User from "@/models/User";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { username, email } = await req.json();

  if (!username || !email) {
    return NextResponse.json(
      { error: "Username and email required" },
      { status: 400 }
    );
  }

  await connect();

  const exists = await User.findOne({
    _id: { $ne: session.user.id },
    $or: [{ username }, { email }],
  });

  if (exists) {
    return NextResponse.json(
      { error: "Username or email already taken" },
      { status: 409 }
    );
  }

  await User.findByIdAndUpdate(session.user.id, {
    username,
    email,
  });

  return NextResponse.json({ success: true });
}
