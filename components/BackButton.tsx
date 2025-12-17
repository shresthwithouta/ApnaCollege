"use client";

import { useRouter, usePathname } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  
  if (pathname === "/dashboard") return null;

  return (
    <button
      onClick={() => router.back()}
      className="
        inline-flex items-center gap-2
        rounded-lg px-3 py-2 text-sm font-medium
        border border-[var(--border-soft)]
        bg-[var(--card-bg)]
        text-[var(--text-main)]
        hover:bg-[var(--accent-soft)]
        transition
      "
      aria-label="Go back"
    >
      ← Back
    </button>
  );
}
