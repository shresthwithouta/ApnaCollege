"use client";

import { useState } from "react";

type Props = {
  user: {
    _id: string;
    email: string;
    role: "user" | "admin";
    gifAllowed: boolean; // ✅ REQUIRED
  };
};

export default function AdminUserControls({ user }: Props) {
  const [role, setRole] = useState(user.role);
  const [gifAllowed, setGifAllowed] = useState(user.gifAllowed);
  const [loading, setLoading] = useState(false);

  async function toggleRole() {
    setLoading(true);

    const newRole = role === "admin" ? "user" : "admin";

    const res = await fetch("/api/admin/users/role", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        newRole,
      }),
    });

    if (res.ok) {
      setRole(newRole);
    }

    setLoading(false);
  }

  async function toggleGifAccess() {
    setLoading(true);

    const res = await fetch("/api/admin/users/gif-access", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        allow: !gifAllowed,
      }),
    });

    if (res.ok) {
      setGifAllowed(!gifAllowed);
    }

    setLoading(false);
  }

  async function deleteUser() {
    const ok = confirm("Delete this user permanently?");
    if (!ok) return;

    await fetch(`/api/admin/users/${user._id}`, {
      method: "DELETE",
    });

    location.href = "/dashboard";
  }

  return (
    <div className="space-y-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
      
      <button
        onClick={toggleRole}
        disabled={loading}
        className="
          w-full text-left px-3 py-2 rounded-lg
          text-sm font-medium
          hover:bg-[#B3B491]/40
          transition
        "
      >
        {role === "admin" ? "Demote to user" : "Promote to admin"}
      </button>

      
      <button
        onClick={toggleGifAccess}
        disabled={loading}
        className="
          w-full text-left px-3 py-2 rounded-lg
          text-sm font-medium
          hover:bg-[#B3B491]/40
          transition
        "
      >
        {gifAllowed ? "Revoke GIF access" : "Allow GIF uploads"}
      </button>

      
      <button
        onClick={deleteUser}
        disabled={loading}
        className="
          w-full text-left px-3 py-2 rounded-lg
          text-sm font-medium text-red-600
          hover:bg-red-100
          transition
        "
      >
        Delete user
      </button>
    </div>
  );
}
