import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connect } from "@/lib/db";
import User from "@/models/User";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  await connect();

  const user = await User.findById(session.user.id)
    .select("name bio image banner tags")
    .lean<{
      name?: string;
      bio?: string;
      image?: string;
      banner?: string;
      tags?: string[];
    }>();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <ProfileForm
        initialName={user.name ?? ""}
        initialBio={user.bio ?? ""}
        initialImage={user.image ?? ""}
        initialBanner={user.banner ?? ""}
        initialTags={(user.tags ?? []).map((t: string) => t)}
      />
    </div>
  );
}
