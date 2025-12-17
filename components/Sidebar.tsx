"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiSearch,
  FiUsers,
  FiShield,
  FiTag,
  FiActivity,
  FiLock,
} from "react-icons/fi";

export default function Sidebar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") return null;
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
          flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
          ${
            active
              ? "bg-[#676F53] text-white shadow-sm"
              : "text-[#381D03] hover:bg-[#B3B491]/40"
          }
        `}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <aside className="w-full md:w-60">
      <div className="sticky top-24 rounded-2xl border border-[#A19379] bg-white p-4 space-y-6">
  
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-[#736046]">
            Main
          </p>
          <nav className="space-y-1">
            {item("/dashboard", "Dashboard", <FiHome size={16} />)}
            {item("/explore", "Explore", <FiSearch size={16} />)}
            {item("/profile", "My Profile", <FiUser size={16} />)}
            {item("/settings", "Account Settings", <FiSettings size={16} />)}
            {item("/settings/security", "Security", <FiLock size={16} />)}
            {item("/activity", "My Activity", <FiActivity size={16} />)}
          </nav>
        </div>

        {role === "admin" && (
          <div className="pt-4 border-t border-[#A19379]/40">
            <p className="mb-2 text-xs font-semibold uppercase text-[#736046]">
              Admin
            </p>

            <nav className="space-y-1">
              {item("/admin", "Overview", <FiShield size={16} />)}
              {item("/admin/users", "Users", <FiUsers size={16} />)}
              {item("/admin/tags", "Tags", <FiTag size={16} />)}
              {item("/admin/audit-logs", "Audit Logs", <FiActivity size={16} />)}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}
