"use client";

import { useState } from "react";
import Button from "./Button";

type Props = {
  initialUsername: string;
  initialEmail: string;
};

export default function AccountSettingsForm({
  initialUsername,
  initialEmail,
}: Props) {
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save");
      }

      setSuccess(true);
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
    <>
      {/* 🔥 FORCE VISIBILITY */}
      <style>{`
        .account-scope,
        .account-scope * {
          color: #381D03 !important;
        }

        .account-scope input {
          background: #FEFAE0 !important;
          color: #381D03 !important;
          border: 1px solid #A19379 !important;
        }

        .account-scope ::placeholder {
          color: #736046 !important;
        }
      `}</style>

      <div className="account-scope max-w-xl space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">
            Account Settings
          </h1>
          <p className="text-sm">
            Login & account information
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#A19379] bg-white p-6 space-y-4"
        >
        
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#676F53]"
              required
            />
          </div>

        
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#676F53]"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-600">
              Saved successfully
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="bg-[#676F53] text-white hover:bg-[#5f664a]"
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </div>
    </>
  );
}
