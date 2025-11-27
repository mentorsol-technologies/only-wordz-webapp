import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.builder.io"],
  },
  reactCompiler: true,
};

export default nextConfig;
