"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import Button from "./Button";

export default function DeleteAccount() {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const ok = confirm(
      "This will permanently delete your account. Continue?"
    );
    if (!ok) return;

    setLoading(true);

    try {
      await fetch("/api/settings/delete", {
        method: "DELETE",
      });

      await signOut({ callbackUrl: "/" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-red-300 bg-white p-6">
      <h2 className="text-lg font-semibold text-red-700">
        Danger Zone
      </h2>

      <p className="text-sm text-[#736046] mt-2">
        This action cannot be undone. Your account and all associated data
        will be permanently removed.
      </p>

      <div className="mt-4">
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Account"}
        </Button>
      </div>
    </div>
  );
}
