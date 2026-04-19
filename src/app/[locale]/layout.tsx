import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import { Inter_Tight } from "next/font/google";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Metadata } from "next";

const interTight = Inter_Tight({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horizon University Indonesia | Expanding Your Horizons",
  description:
    "Unlock your true potential with Horizon University Indonesia. Innovative higher education built for future generations.",
  icons: {
    icon: [
      { url: "/assets/icons/favicon.ico", type: "image/x-icon" },
      {
        url: "/assets/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/assets/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/assets/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/assets/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={interTight.className}>
      <body>
        <NextIntlClientProvider>
          {/* <Header /> */}
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
          {/* <Footer /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
