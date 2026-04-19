import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const imageDomains = process.env.IMAGE_DOMAINS
  ? process.env.IMAGE_DOMAINS.split(",").map((domain) => domain.trim())
  : [];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: imageDomains,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        ...(process.env.NEXT_PUBLIC_BASE_URL
          ? [process.env.NEXT_PUBLIC_BASE_URL]
          : []),
      ],
    },
    authInterrupts: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);