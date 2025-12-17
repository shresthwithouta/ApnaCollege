"use client";

import { useMemo, useState } from "react";
import AdminRoleButton from "@/components/AdminRoleButton";

type UserRow = {
  _id: string;
  name?: string;
  username: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
};

type Props = {
  users: UserRow[];
  currentAdminId: string;
};

export default function AdminUsersTable({
  users,
  currentAdminId,
}: Props) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] =
    useState<"all" | "user" | "admin">("all");

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = query.toLowerCase();

      const matchesQuery =
        u.name?.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);

      const matchesRole =
        roleFilter === "all" || u.role === roleFilter;

      return matchesQuery && matchesRole;
    });
  }, [users, query, roleFilter]);

  return (
    <div className="space-y-4">
     
      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Search by name, username or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            rounded-lg px-3 py-2 text-sm
            bg-[#FEFAE0] text-[#381D03]
            border border-[#A19379]
            focus:outline-none focus:ring-2 focus:ring-[#676F53]
          "
        />

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(
              e.target.value as "all" | "user" | "admin"
            )
          }
          className="
            rounded-lg px-3 py-2 text-sm
            bg-[#FEFAE0] text-[#381D03]
            border border-[#A19379]
          "
        >
          <option value="all">All roles</option>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

     
      <div className="overflow-x-auto rounded-2xl border border-[#A19379] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[#B3B491]/40">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#A19379]/40">
            {filteredUsers.map((user) => {
              const isSelf = user._id === currentAdminId;

              return (
                <tr key={user._id} className="hover:bg-[#FEFAE0]/60">
                  <td className="px-4 py-3 font-medium">
                    {user.name || "—"}
                  </td>

                  <td className="px-4 py-3 text-[#736046]">
                    @{user.username}
                  </td>

                  <td className="px-4 py-3">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {user.role}
                  </td>

                  <td className="px-4 py-3 text-[#736046]">
                    {new Date(user.createdAt)
                      .toISOString()
                      .slice(0, 10)}
                  </td>

                  <td className="px-4 py-3">
                    <AdminRoleButton
                      userId={user._id}
                      currentRole={user.role}
                      isSelf={isSelf}
                    />
                  </td>
                </tr>
              );
            })}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-[#736046]"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
