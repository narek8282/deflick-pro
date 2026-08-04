import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "player.vimeo.com" },
      { protocol: "https", hostname: "i.vimeocdn.com" }
    ]
  }
};

export default nextConfig;
