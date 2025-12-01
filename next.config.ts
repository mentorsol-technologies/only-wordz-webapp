import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  // output: "export",
};

export default nextConfig;
