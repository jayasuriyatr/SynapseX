import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this app to avoid lockfile auto-detection
  // picking a parent directory (multiple lockfiles exist on this machine).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
