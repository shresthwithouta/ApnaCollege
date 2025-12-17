"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  currentRole: "user" | "admin";
  isSelf: boolean;
};

export default function AdminRoleButton({
  userId,
  currentRole,
  isSelf,
}: Props) {
  const [role, setRole] = useState<"user" | "admin">(currentRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  if (isSelf) {
    return (
      <span className="text-sm text-[#736046]">
        —
      </span>
    );
  }

  async function toggleRole() {
    setLoading(true);
    setError("");

    const prevRole = role;
    const newRole = role === "admin" ? "user" : "admin";

    setRole(newRole);

    try {
      const res = await fetch("/api/admin/users/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!res.ok) {
        throw new Error("Failed to update role");
      }

      router.refresh();
    } catch {
      setRole(prevRole);
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 🔥 FORCE VISIBILITY (isolated & safe) */}
      <style>{`
        .admin-role-scope,
        .admin-role-scope * {
          color: #381D03 !important;
        }
      `}</style>

      <div className="admin-role-scope flex flex-col items-start gap-1">
        <button
          onClick={toggleRole}
          disabled={loading}
          className={`
            rounded-lg px-3 py-1.5 text-sm text-white font-medium outline-3 rounded-full bg-transparent
            transition
            ${
              role === "admin"
                ? "bg-[#40221d]  hover:bg-[#8b7d65] hover:text-white"
                : "bg-[#40221d]  hover:bg-[#5f664a] hover:text-white"
            }
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
        >
          {loading
            ? "Updating..."
            : role === "admin"
            ? "Demote"
            : "Promote"}
        </button>

        {error && (
          <span className="text-xs text-red-600">
            {error}
          </span>
        )}
      </div>
    </>
  );
}
