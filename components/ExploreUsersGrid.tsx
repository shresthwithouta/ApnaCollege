"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import TagBadge from "@/components/TagBadge";

export type ExploreTag = {
  _id: string;
  name: string;
  color?: string;
};

export type ExploreUser = {
  _id: string;
  name?: string;
  username: string;
  image?: string;
  role: "user" | "admin";
  tags: ExploreTag[];
};

type Props = {
  users: ExploreUser[];
};

export default function ExploreUsersGrid({ users }: Props) {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const q = query.toLowerCase();

    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q)
    );
  }, [users, query]);

  return (
    <div className="space-y-6">
    
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users…"
        className="
          w-full max-w-md
          rounded-lg px-3 py-2 text-sm
          bg-[#FEFAE0] text-[#381D03]
          border border-[#A19379]
          focus:outline-none focus:ring-2 focus:ring-[#676F53]
        "
      />

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <Link
            key={user._id}
            href={`/users/${user.username}`}
            className="
              hover-card
              rounded-2xl
              border border-[#A19379]
              bg-white
              p-5
              space-y-4
            "
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#B3B491] flex items-center justify-center text-lg font-bold text-[#381D03]">
                {user.name?.[0] || user.username[0]}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-[#381D03]">
                  {user.name || "Unnamed"}
                </p>
                <p className="text-sm text-[#736046]">
                  @{user.username}
                </p>
              </div>

              {user.role === "admin" && (
                <span className="text-xs font-semibold text-[#676F53] border border-[#676F53] px-2 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </div>

            {user.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {user.tags.slice(0, 4).map((tag) => (
                  <TagBadge
                    key={tag._id}
                    name={tag.name}
                    color={tag.color}
                  />
                ))}
              </div>
            )}
          </Link>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-sm text-[#736046]">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
}
