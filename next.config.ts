import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "1" ? { output: "export" as const, trailingSlash: true } : {}),
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    unoptimized: process.env.STATIC_EXPORT === "1",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "player.vimeo.com" },
      { protocol: "https", hostname: "i.vimeocdn.com" }
    ]
  }
};

export default nextConfig;
