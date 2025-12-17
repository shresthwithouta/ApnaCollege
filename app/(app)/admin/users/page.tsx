import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import User from "@/models/User";
import PageHeader from "@/components/PageHeader";
import AdminUsersTable from "@/components/AdminUsersTable";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/dashboard");

  await connect();

  const users = await User.find()
    .select("name email username role createdAt")
    .lean();

  const mappedUsers = users.map((u) => ({
    _id: u._id.toString(),
    name: u.name,
    username: u.username,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div className="relative min-h-[calc(100vh-120px)] overflow-hidden">
     
      <div className="absolute inset-0 -z-10">

        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-main)] via-[var(--accent-soft)]/40 to-[var(--bg-main)]" />

        
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(var(--border-soft) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            animation: "bgMove 30s linear infinite",
          }}
        />
      </div>

      <div className="relative space-y-5">
        <PageHeader
          title="Users"
          description="Search, filter and manage all users"
        />

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat title="Total users" value={mappedUsers.length} />
          <Stat
            title="Admins"
            value={mappedUsers.filter(u => u.role === "admin").length}
          />
          <Stat
            title="Regular users"
            value={mappedUsers.filter(u => u.role !== "admin").length}
          />
        </div>

       
        <div
          className="
            card
            bg-[var(--card-bg)]
            shadow-[0_20px_50px_rgba(0,0,0,0.25)]
            transition-all duration-300
            hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)]
          "
        >
          <AdminUsersTable
            users={mappedUsers}
            currentAdminId={session.user.id}
          />
        </div>
      </div>

     
      <style>{`
        @keyframes bgMove {
          from { background-position: 0 0, 0 0; }
          to { background-position: 400px 400px, 400px 400px; }
        }
      `}</style>
    </div>
  );
}



function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div
      className="
        card
        bg-[var(--card-bg)]
        shadow-lg
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)]
      "
    >
      <p className="text-xs uppercase tracking-wide muted">
        {title}
      </p>
      <p className="mt-1 text-3xl font-extrabold">
        {value}
      </p>
    </div>
  );
}
