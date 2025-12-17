import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connect } from "@/lib/db";
import User from "@/models/User";
import PageHeader from "@/components/PageHeader";
import StatsCard from "@/components/StatsCard";
import Link from "next/link";
import "@/models/Tags";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connect();

  const user = await User.findById(session.user.id)
    .populate("tags", "name")
    .lean();

  if (!user) redirect("/login");

  const tagsCount = user.tags?.length ?? 0;
  const profileComplete =
    Boolean(user.name) &&
    Boolean(user.username) &&
    Boolean(user.bio);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${user.name ?? "there"}`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/profile"
          className="hover-card rounded-xl border border-[#A19379] bg-white p-4"
        >
          <p className="text-sm text-[#736046]">Profile</p>
          <p className="font-semibold">Edit your profile</p>
        </Link>

        <Link
          href="/explore"
          className="hover-card rounded-xl border border-[#A19379] bg-white p-4"
        >
          <p className="text-sm text-[#736046]">Explore</p>
          <p className="font-semibold">Find other users</p>
        </Link>

        <Link
          href="/settings"
          className="hover-card rounded-xl border border-[#A19379] bg-white p-4"
        >
          <p className="text-sm text-[#736046]">Settings</p>
          <p className="font-semibold">Account & security</p>
        </Link>

        {session.user.role === "admin" && (
          <Link
            href="/admin/users"
            className="hover-card rounded-xl border border-[#A19379] bg-[#B3B491]/60 p-4"
          >
            <p className="text-sm text-[#736046]">Admin</p>
            <p className="font-semibold">Manage users</p>
          </Link>
        )}
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Profile status"
          value={profileComplete ? "Complete" : "Incomplete"}
          variant={profileComplete ? "default" : "accent"}
        >
          {profileComplete
            ? "Your profile is visible to others"
            : "Complete your profile to be discoverable"}
        </StatsCard>

        <StatsCard title="Tags" value={tagsCount}>
          Skills & interests you’ve added
        </StatsCard>

        <StatsCard title="Account type" value="Standard">
          Upgrade later if needed
        </StatsCard>
      </div>
    </div>
  );
}
