"use client";

import { useState } from "react";
import Button from "./Button";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/settings/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update password");

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[#A19379] bg-white p-6 max-w-xl">
      <h2 className="text-lg font-semibold text-[#381D03] mb-4">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#381D03]">
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg px-4 py-2 bg-[#FEFAE0] text-[#381D03] border border-[#A19379] focus:outline-none focus:ring-2 focus:ring-[#676F53]"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-[#381D03]">
            New password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg px-4 py-2 bg-[#FEFAE0] text-[#381D03] border border-[#A19379] focus:outline-none focus:ring-2 focus:ring-[#676F53]"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="text-sm text-green-600">
            Password updated successfully
          </p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
