// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "night-club-api-production-2d68.up.railway.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "night-club-api-3jes.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;