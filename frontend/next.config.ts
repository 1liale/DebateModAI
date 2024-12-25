import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  /* other config options */
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
