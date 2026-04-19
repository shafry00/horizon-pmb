import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { Locale } from "next-intl";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...getEntries("/"),
    ...getEntries("/pmb"),
    ...getEntries("/re-register"),
    ...getEntries("/scholarship-register"),
  ];
}

type Href = Parameters<typeof getPathname>[0]["href"];

function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((cur) => [cur, getUrl(href, cur)])
      ),
    },
  }));
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return baseUrl + pathname;
}
