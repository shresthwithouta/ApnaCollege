import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import User from "@/models/User";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session) throw new Error("Unauthorized");

      await connect();
      const user = await User.findById(session.user.id)
        .select("role gifAllowed")
        .lean();

      if (!user) throw new Error("User not found");

      return {
        userId: session.user.id,
        role: user.role,
        gifAllowed: user.gifAllowed,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const isGif = file.name.toLowerCase().endsWith(".gif");

      const canUseGif =
        metadata.role === "admin" || metadata.gifAllowed === true;

      if (isGif && !canUseGif) {
        throw new Error("GIF uploads are not allowed for your account");
      }

      return {
        uploadedBy: metadata.userId,
        url: file.ufsUrl,
      };
    }),

  bannerImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session) throw new Error("Unauthorized");

      await connect();
      const user = await User.findById(session.user.id)
        .select("role gifAllowed")
        .lean();

      if (!user) throw new Error("User not found");

      return {
        userId: session.user.id,
        role: user.role,
        gifAllowed: user.gifAllowed,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const isGif = file.name.toLowerCase().endsWith(".gif");

      const canUseGif =
        metadata.role === "admin" || metadata.gifAllowed === true;

      if (isGif && !canUseGif) {
        throw new Error("GIF uploads are not allowed for your account");
      }

      return {
        uploadedBy: metadata.userId,
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
export const utapi = new UTApi()
