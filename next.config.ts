import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // ✅ REQUIRED for Vercel (fixes routes-manifest error)

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
