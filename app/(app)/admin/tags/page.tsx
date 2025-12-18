"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

 const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

type Tag = {
  _id: string;
  name: string;
  visibility: "user" | "admin";
};

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [name, setName] = useState("");
  const [visibility, setVisibility] =
    useState<"user" | "admin">("user");
  const [loading, setLoading] = useState(false);

  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    (async () => {
      try {
        const res = await fetch("/api/admin/tags");
        const data = await res.json();
        setTags(data.tags || []);
      } catch {
        setTags([]);
      }
    })();
  }, []);

  async function reloadTags() {
    const res = await fetch("/api/admin/tags");
    const data = await res.json();
    setTags(data.tags || []);
  }

  async function createTag(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/admin/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, visibility }),
    });

    setName("");
    setVisibility("user");
    setLoading(false);
    reloadTags();
  }

  async function deleteTag(id: string) {
    if (!confirm("Delete this tag?")) return;

    const res = await fetch(`/api/admin/tags/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    reloadTags();
  }

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-extrabold">
          Admin Tags
        </h1>
        <p className="text-sm muted">
          Manage tags available to users and admins
        </p>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      


        <form
          onSubmit={createTag}
          className="
            lg:col-span-1
            card
            hover-card
            bg-[var(--card-bg)]
            p-4
            transition-all
            animate-fadeIn
          "
        >
          <h3 className="text-sm font-semibold mb-3">
            Create tag
          </h3>

          <div className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tag name"
              required
              className="
                input
                transition-all
                focus:ring-2 focus:ring-[var(--accent)]
              "
            />

            <select
              value={visibility}
              onChange={(e) =>
                setVisibility(e.target.value as "user" | "admin")
              }
              className="
                input
                cursor-pointer
                transition-all
                focus:ring-2 focus:ring-[var(--accent)]
              "
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <Button
              type="submit"
              disabled={loading}
              className="
                w-full
                btn-hover
                transition-all
                hover:shadow-md
              "
            >
              {loading ? "Creating..." : "Create tag"}
            </Button>
          </div>
        </form>

     


        <div
          className="
            lg:col-span-3
            card
            bg-[var(--card-bg)]
            overflow-hidden
          "
        >
          <div className="px-4 py-3 border-b border-[var(--border-soft)]">
            <h3 className="text-sm font-semibold">
              Existing tags
            </h3>
          </div>

          {tags.length === 0 && (
            <p className="p-4 text-sm muted">
              No tags created yet.
            </p>
          )}

          <ul className="divide-y divide-[var(--border-soft)]">
            {tags.map((tag) => (
              <li
                key={tag._id}
                className="
                  group
                  relative
                  flex items-center justify-between
                  px-4 py-3
                  transition-all
                  hover:bg-[var(--bg-main)]
                "
              >
               


                <span
                  className="
                    absolute left-0 top-0 h-full w-1
                    bg-[var(--accent)]
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "
                />

                <div>
                  <p
                    className="
                      font-medium
                      transition
                      group-hover:text-[var(--accent)]
                    "
                  >
                    {tag.name}
                  </p>
                  <p className="text-xs muted">
                    Visibility: {tag.visibility}
                  </p>
                </div>

                <button
                  onClick={() => deleteTag(tag._id)}
                  className="
                    text-sm font-medium
                    text-red-600
                    transition
                    hover:scale-105
                    hover:text-red-700
                  "
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
