import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import User from "@/models/User";
import { UTApi } from "uploadthing/server";
import mongoose from "mongoose";

const utapi = new UTApi();

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connect();

  const body = await req.json();
  const user = await User.findById(session.user.id);

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }


  if (body.remove === "image" && user.image) {
    await utapi.deleteFiles(user.image);
    user.image = "";
  }

  if (body.remove === "banner" && user.banner) {
    await utapi.deleteFiles(user.banner);
    user.banner = "";
  }


  if (typeof body.name === "string") {
    user.name = body.name;
  }

  if (typeof body.bio === "string") {
    user.bio = body.bio;
  }


  if (body.image && body.image !== user.image) {
    if (user.image) {
      await utapi.deleteFiles(user.image);
    }
    user.image = body.image;
  }

  if (body.banner && body.banner !== user.banner) {
    if (user.banner) {
      await utapi.deleteFiles(user.banner);
    }
    user.banner = body.banner;
  }


  if (Array.isArray(body.tags)) {
    user.tags = body.tags.map(
      (id: string) => new mongoose.Types.ObjectId(id)
    );
  }


  await user.save();

  return NextResponse.json({ success: true });
}
