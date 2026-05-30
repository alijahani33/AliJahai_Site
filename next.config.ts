import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/AliJahai_Site', // Uncomment this if deploying to a project repository instead of user root
  images: { unoptimized: true }, // Required for static export with next/image, even if not strictly used now
};

export default nextConfig;
