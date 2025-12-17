export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import AuditLog from "@/models/AuditLog";

export default async function AdminAuditLogsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  await connect();

  const logs = await AuditLog.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-extrabold">
          Audit Logs
        </h1>
        <p className="text-sm muted">
          Recent administrative actions
        </p>
      </div>



      <div
        className="
          rounded-2xl
          border border-[var(--border-soft)]
          bg-[var(--card-bg)]
          overflow-hidden
        "
      >
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full border-collapse text-sm">
          


            <thead className="sticky top-0 z-10 bg-[var(--accent-soft)]">
              <tr>
                <Th>Action</Th>
                <Th>Actor</Th>
                <Th>Target</Th>
                <Th>Time</Th>
              </tr>
            </thead>

            <tbody>
              {logs.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center muted"
                  >
                    No audit logs found.
                  </td>
                </tr>
              )}

              {logs.map((log) => (
                <tr
                  key={log._id.toString()}
                  className="
                    group
                    border-t border-[var(--border-soft)]/60
                    transition
                    hover:bg-[var(--bg-main)]
                  "
                >
                  {/* ACTION */}
                  <td className="px-4 py-3">
                    <span
                      className="
                        inline-block
                        rounded-md
                        border border-[var(--border-soft)]
                        bg-[var(--bg-main)]
                        px-2 py-1
                        text-xs font-semibold
                        transition
                        group-hover:border-[var(--accent)]
                      "
                    >
                      {log.action}
                    </span>
                  </td>

                  {/* ACTOR */}
                  <td className="px-4 py-3 font-medium">
                    {log.actorEmail || "—"}
                  </td>

                  {/* TARGET */}
                  <td className="px-4 py-3">
                    {log.targetEmail || "—"}
                  </td>

                  {/* TIME */}
                  <td className="px-4 py-3 muted whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="
        px-4 py-3
        text-left
        text-xs
        font-semibold
        uppercase
        tracking-wide
      "
    >
      {children}
    </th>
  );
}
