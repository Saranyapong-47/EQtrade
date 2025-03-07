import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['next-auth'],
  experimental: {

  },
  webpack: (config) => {
    // แก้ปัญหาการ import module
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  },
  
};

export default nextConfig;
