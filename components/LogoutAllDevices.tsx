"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import Button from "./Button";

export default function LogoutAllDevices() {
  const [loading, setLoading] = useState(false);

  async function handleLogoutAll() {
    const ok = confirm(
      "This will log you out from all devices. Continue?"
    );
    if (!ok) return;

    setLoading(true);

    try {
      await fetch("/api/settings/logout-all", {
        method: "POST",
      });

      await signOut({ callbackUrl: "/login" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-yellow-300 bg-white p-6">
      <h2 className="text-lg font-semibold text-yellow-700">
        Security
      </h2>

      <p className="text-sm text-[#736046] mt-2">
        Log out from all devices and browsers currently signed into
        your account.
      </p>

      <div className="mt-4">
        <Button
          variant="ghost"
          onClick={handleLogoutAll}
          disabled={loading}
          className="border border-yellow-300 text-yellow-700 hover:bg-yellow-100"
        >
          {loading ? "Logging out..." : "Logout all devices"}
        </Button>
      </div>
    </div>
  );
}
