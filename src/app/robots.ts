import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const robots: MetadataRoute.Robots =
    process.env.NODE_ENV === "development"
      ? // development
        {
          rules: {
            userAgent: "*",
            disallow: "/",
          },
        }
      : // production
        {
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
