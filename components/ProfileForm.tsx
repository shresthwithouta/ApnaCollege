"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";
import UserTagSelector from "@/components/UserTagSelector";

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
    <div className="space-y-8">
 
      <div className="relative h-40 rounded-xl overflow-hidden bg-[#B3B491]/40">
        {banner && (
          <Image src={banner} alt="Banner" fill className="object-cover" />
        )}

        <div className="absolute top-2 right-2 flex gap-2">
          {banner && (
            <button
              onClick={() => remove("banner")}
              className="bg-black/60 text-white text-xs px-2 py-1 rounded"
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
                "bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-black",
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#B3B491]/40">
          {image && (
            <Image src={image} alt="Avatar" fill className="object-cover" />
          )}

          {image && (
            <button
              onClick={() => remove("image")}
              className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 rounded"
            >
              ✕
            </button>
          )}
        </div>

        <UploadButton<OurFileRouter, "profileImage">
          endpoint="profileImage"
          onClientUploadComplete={(res) => {
            if (res?.[0]?.url) setImage(res[0].url);
          }}
          onUploadError={(err) => setError(err.message)}
          appearance={{
            button:
              "bg-[#676F53] text-white px-4 py-2 rounded hover:opacity-90",
          }}
        />
      </div>

 
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

   
      <div>
        <label className="text-sm font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

  
      <UserTagSelector selectedTags={tags} onChange={setTags} />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={save}
        disabled={loading}
        className="w-full bg-[#676F53] text-white py-2 rounded"
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}