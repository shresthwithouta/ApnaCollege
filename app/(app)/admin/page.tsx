import PageHeader from "@/components/PageHeader";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

 const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }
export default function AdminOverviewPage() {
  return (
    <div className="relative space-y-6">
      <PageHeader
        title="Admin Overview"
        description="Administrative tools and system management"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <AdminCard
            href="/admin/users"
            title="Users"
            subtitle="Accounts & access"
            desc="View, edit, suspend, and manage all user accounts."
            stats={["Active users", "Roles", "Permissions"]}
          />

          <AdminCard
            href="/admin/tags"
            title="Tags"
            subtitle="Classification system"
            desc="Create, edit, and organize tags used across profiles."
            stats={["Skill tags", "Interest tags", "Usage"]}
          />

          <AdminCard
            href="/admin/audit-logs"
            title="Audit Logs"
            subtitle="System events"
            desc="Review administrative actions and system-level activity."
            stats={["User actions", "Admin actions", "System events"]}
          />
        </div>

        <div
          className="
            card
            hover-card
            bg-[var(--card-bg)]
            transition-all duration-300
            hover:shadow-lg
            order-last lg:order-none
          "
        >
          <h3 className="text-sm font-semibold mb-2">
            Admin status
          </h3>

          <div className="space-y-2 text-sm">
            <Row label="Role" value="Administrator" />
            <Row label="Access level" value="Full" />
            <Row label="Logging" value="Enabled" />
          </div>

          <div className="mt-4 border-t border-[var(--border-soft)] pt-3 space-y-2">
            <p className="text-xs muted">
              All actions are logged and auditable.
            </p>
            <p className="text-xs muted">
              Changes affect all users immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminCard({
  href,
  title,
  subtitle,
  desc,
  stats,
}: {
  href: string;
  title: string;
  subtitle: string;
  desc: string;
  stats: string[];
}) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        card
        hover-card
        bg-[var(--card-bg)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div
        className="
          pointer-events-none
          absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          ring-1 ring-[var(--accent)]/30
        "
      />

      <div className="relative">
        <p className="text-xs uppercase tracking-wide muted">
          {subtitle}
        </p>

        <h3 className="mt-1 text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-sm muted leading-snug">
          {desc}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {stats.map((s) => (
            <span
              key={s}
              className="
                rounded-md px-2 py-1
                text-xs
                border border-[var(--border-soft)]
                bg-[var(--bg-main)]
                transition
                group-hover:border-[var(--accent)]
              "
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm font-medium text-[var(--accent)] transition group-hover:translate-x-1">
          Open →
        </div>
      </div>
    </Link>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
