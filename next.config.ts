import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1nxlzrmxqo.ufs.sh",
      },
    ],
  },
};

export default nextConfig;