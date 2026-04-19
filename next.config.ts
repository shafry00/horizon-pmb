import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createCloudflareAdapter from "@opennextjs/cloudflare/adapter";

const imageDomains = process.env.IMAGE_DOMAINS
  ? process.env.IMAGE_DOMAINS.split(",").map((domain) => domain.trim())
  : [];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: imageDomains,
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        ...(process.env.NEXT_PUBLIC_BASE_URL
          ? [process.env.NEXT_PUBLIC_BASE_URL]
          : []),
      ],
      bodySizeLimit: "2mb",
    },
    authInterrupts: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
const cloudflareAdapter = createCloudflareAdapter(nextConfig);
export default cloudflareAdapter;