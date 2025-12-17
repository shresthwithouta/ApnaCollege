"use client";

import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";
import { FiCamera, FiX } from "react-icons/fi";

type Props = {
  variant: "avatar" | "banner";
  endpoint: "profileImage" | "bannerImage";
  value: string;
  onChange: (url: string) => void;
};

export default function ProfileMediaEditor({
  variant,
  endpoint,
  value,
  onChange,
}: Props) {
  const isBanner = variant === "banner";

  return (
    <div
      className={`relative ${
        isBanner
          ? "h-44 w-full rounded-xl overflow-hidden"
          : "h-24 w-24 rounded-full overflow-hidden border-2 border-[#676F53]"
      } bg-[#FEFAE0]`}
    >
    
      {value && (
        <Image
          src={value}
          alt=""
          fill
          className="object-cover"
        />
      )}

   
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition">
        <UploadButton<OurFileRouter, typeof endpoint>
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            if (res?.[0]?.url) {
              onChange(res[0].url);
            }
          }}
          onUploadError={(error) => {
            console.error(error.message);
          }}
          appearance={{
            button:
              "w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center",
            allowedContent: "hidden",
          }}
          content={{
            button: <FiCamera size={18} />,
          }}
        />
      </div>

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-2 right-2 z-10 rounded-full bg-black/70 p-1 text-white hover:bg-black"
        >
          <FiX size={14} />
        </button>
      )}
    </div>
  );
}