import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const robots: MetadataRoute.Robots =
    process.env.NODE_ENV === "development"
      ? {
          rules: {
            userAgent: "*",
            disallow: "/",
          },
        }
      : {
          rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
              "/dashboard",
              "/dashboard/",
              "/dashboard/*",
              "/auth",
              "/auth/*",
            ],
          },
          sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
        };

  return robots;
}