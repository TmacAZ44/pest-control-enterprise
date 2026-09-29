import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  webpack: (config, { dev }) => {
    config.resolve.symlinks = false;
    // Node 24 on this Windows drive cannot snapshot the filesystem pack cache.
    if (dev) config.cache = { type: "memory" };
    return config;
  },
};

export default nextConfig;
