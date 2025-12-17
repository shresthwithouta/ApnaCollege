import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import Tag from "@/models/Tags";

export async function GET() {
  await connect();

  const tags = await Tag.find({ visibility: "user" })
    .select("name color")
    .lean();

  return NextResponse.json({ tags });
}
