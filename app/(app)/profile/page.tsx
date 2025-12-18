import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connect } from "@/lib/db";
import User from "@/models/User";
import ProfileForm from "@/components/ProfileForm";
import { Types } from "mongoose";

type TagRef =
  | Types.ObjectId
  | {
      _id: Types.ObjectId;
    };

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connect();

  const user = await User.findById(session.user.id)
    .select("name bio image banner tags")
    .lean<{
      name?: string;
      bio?: string;
      image?: string;
      banner?: string;
      tags?: TagRef[];
    }>();

  if (!user) redirect("/login");

  const tagIds: string[] =
    user.tags?.map((tag) =>
      tag instanceof Types.ObjectId
        ? tag.toString()
        : tag._id.toString()
    ) ?? [];

  return (
    <div className="w-full px-4 py-4 md:max-w-2xl md:mx-auto md:py-8">
      <ProfileForm
        initialName={user.name ?? ""}
        initialBio={user.bio ?? ""}
        initialImage={user.image ?? ""}
        initialBanner={user.banner ?? ""}
        initialTags={tagIds}
      />
    </div>
  );
}
