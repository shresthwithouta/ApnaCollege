"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import {
  FiHome,
  FiCompass,
  FiUser,
  FiSettings,
  FiShield,
} from "react-icons/fi";

export default function MobileNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session) return null;

  const role = session.user.role;

  function item(
    href: string,
    label: string,
    icon: React.ReactNode
  ) {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`
          flex flex-col items-center justify-center gap-1
          text-xs
          ${active ? "text-[#676F53]" : "text-[#736046]"}
        `}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        border-t border-[#A19379]
        bg-[#FEFAE0]
        md:hidden
      "
    >
      <div className="flex justify-around py-2">
        {item("/dashboard", "Home", <FiHome size={18} />)}
        {item("/explore", "Explore", <FiCompass size={18} />)}
        {item("/profile", "Profile", <FiUser size={18} />)}
        {item("/settings", "Settings", <FiSettings size={18} />)}

        {role === "admin" &&
          item("/admin/users", "Admin", <FiShield size={18} />)}
      </div>
    </nav>
  );
}
