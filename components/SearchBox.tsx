"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type UserResult = {
  _id: string;
  name: string;
  username: string;
  image?: string;
};

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [open, setOpen] = useState(false);

  function handleChange(value: string) {
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      setOpen(false);
    }
  }

  useEffect(() => {
    if (query.length < 2) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();

        setResults(data.users || []);
        setOpen(true);
      } catch {
        setResults([]);
        setOpen(false);
      }
    }, 250); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-64">
      <input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search users..."
        className="
          w-full rounded-lg px-3 py-2
          bg-[#FEFAE0] text-[#381D03]
          border border-[#A19379]
          placeholder:text-[#736046]
          focus:outline-none focus:ring-2 focus:ring-[#676F53]
        "
      />

      {open && results.length > 0 && (
        <div className="absolute mt-2 w-full rounded-lg bg-white border border-[#A19379] shadow-lg z-50 overflow-hidden">
          {results.map((user) => (
            <Link
              key={user._id}
              href={`/users/${user.username}`}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 hover:bg-[#FEFAE0]"
            >
              <div className="text-sm font-medium text-[#381D03]">
                {user.name}
              </div>
              <div className="text-xs text-[#736046]">
                @{user.username}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
