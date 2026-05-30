import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/AliJahai_Site', // Required if deploying to https://alijahani33.github.io/AliJahai_Site
  images: { unoptimized: true }, // Required for static export with next/image, even if not strictly used now
};

export default nextConfig;
