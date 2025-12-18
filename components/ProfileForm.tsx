"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";
import UserTagSelector from "@/components/UserTagSelector";
import { MdOutlineCloudDownload } from "react-icons/md";

type Props = {
  initialName: string;
  initialBio: string;
  initialImage: string;
  initialBanner: string;
  initialTags: string[];
};

export default function ProfileForm({
  initialName,
  initialBio,
  initialImage,
  initialBanner,
  initialTags,
}: Props) {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [image, setImage] = useState(initialImage);
  const [banner, setBanner] = useState(initialBanner);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= BIO AUTO GROW ================= */
  const bioRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (bioRef.current) {
      bioRef.current.style.height = "auto";
      bioRef.current.style.height =
        bioRef.current.scrollHeight + "px";
    }
  }, [bio]);

  async function save() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio, image, banner, tags }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed");
    }

    setLoading(false);
  }

  async function remove(type: "image" | "banner") {
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ remove: type }),
    });

    if (type === "image") setImage("");
    if (type === "banner") setBanner("");
  }

  return (
    <div className="space-y-16">
      {/* ================= WRAPPER ================= */}
      <div className="relative">
        {/* ================= BANNER (UNCHANGED) ================= */}
        <div className="relative h-32 md:h-40 outline-4 rounded-xl overflow-hidden bg-[#B3B491]/40">
          {banner && (
            <Image src={banner} alt="Banner" fill className="object-cover" />
          )}

          <div className="absolute top-2 right-2 flex gap-2">
            {banner && (
              <button
                onClick={() => remove("banner")}
                className="flex justify-center z-20 items-center outline-2 bg-[#161004] text-white text-xl w-9 p-2 rounded-full hover:bg-[#161004]/60"
              >
                ✕
              </button>
            )}

            <UploadButton<OurFileRouter, "bannerImage">
              endpoint="bannerImage"
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) setBanner(res[0].url);
              }}
              onUploadError={(err) => setError(err.message)}
              appearance={{
                button:
                  "bg-transparent z-10 text-white h-8 w-8 rounded-full",
                allowedContent: "hidden",
                container: "w-auto",
              }}
            />
          </div>

          <button className="md-hidden w-8 h-8 fixed right-6 top-6 bg-white flex justify-center items-center rounded-full outline-3 mb-20 md:top-10 md:right-42">
            <MdOutlineCloudDownload size={28} />
          </button>
        </div>

        {/* ================= PFP OVERLAP ================= */}
        <div className="absolute left-1/2 -bottom-12 -translate-x-1/2 z-10">
          {image && (
            <button
              onClick={() => remove("image")}
              className="absolute -bottom-9 left-1/2 -translate-x-1/2 z-20 bg-[#161004] text-white w-8 h-8 rounded-full flex justify-center items-center hover:bg-[#161004]/80"
            >
              ✕
            </button>
          )}

          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden outline-4 shadow-2xl bg-[#B3B491]/40">
            {image && (
              <Image src={image} alt="Avatar" fill className="object-cover" />
            )}

            <UploadButton<OurFileRouter, "profileImage">
              endpoint="profileImage"
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) setImage(res[0].url);
              }}
              onUploadError={(err) => setError(err.message)}
              appearance={{
                button: "absolute inset-0 opacity-0 cursor-pointer",
                allowedContent: "hidden",
                container: "w-full h-full",
              }}
            />

            <div className="absolute bottom-0 right-0 bg-white w-8 h-8 rounded-full flex items-center justify-center z-10">
              <MdOutlineCloudDownload size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div>
        <label className="text-sm font-extrabold">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border-2 px-3 py-2"
        />
      </div>

      {/* ================= BIO (AUTO GROW) ================= */}
      <div>
        <label className="text-sm font-extrabold">Bio</label>

        <textarea
          ref={bioRef}
          value={bio}
          onChange={(e) =>
            setBio(e.target.value.slice(0, 500))
          }
          rows={3}
          className="mt-1 w-full resize-none overflow-hidden rounded-lg border-2 px-3 py-2 leading-relaxed"
          placeholder="Tell something about yourself…"
        />

        <div className="mt-1 text-xs text-gray-500 text-right">
          {bio.length}/500
        </div>
      </div>

      <UserTagSelector selectedTags={tags} onChange={setTags} />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={save}
        disabled={loading}
        className="w-full bg-[#676F53] text-white text-bold py-2 rounded-lg hover:bg-[#3b422a]"
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}
