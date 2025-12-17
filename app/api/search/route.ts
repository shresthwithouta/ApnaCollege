import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ users: [] });
  }

  await connect();

  const users = await User.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { username: { $regex: q, $options: "i" } },
    ],
  })
    .select("name username image")
    .limit(8)
    .lean();

  return NextResponse.json({ users });
}
