"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

type Props = {
  initialName: string;
};

export default function OnboardingModal({ initialName }: Props) {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          bio,
          image,
          banner,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setOpen(false);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#A19379] bg-white p-6">
        <h2 className="text-xl font-extrabold text-[#381D03] mb-1">
          Complete your profile
        </h2>
        <p className="text-sm text-[#736046] mb-5">
          This helps personalize your experience.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#381D03]">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg px-4 py-2 bg-[#FEFAE0] text-[#381D03] border border-[#A19379] focus:outline-none focus:ring-2 focus:ring-[#676F53]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#381D03]">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full rounded-lg px-4 py-2 bg-[#FEFAE0] text-[#381D03] border border-[#A19379] focus:outline-none focus:ring-2 focus:ring-[#676F53]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#381D03]">
              Profile image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-lg px-4 py-2 bg-[#FEFAE0] text-[#381D03] border border-[#A19379] focus:outline-none focus:ring-2 focus:ring-[#676F53]"
            />
          </div>

      
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#381D03]">
              Banner image URL
            </label>
            <input
              type="text"
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
              className="w-full rounded-lg px-4 py-2 bg-[#FEFAE0] text-[#381D03] border border-[#A19379] focus:outline-none focus:ring-2 focus:ring-[#676F53]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="pt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
