import { hasLocale } from "next-intl";
import { notFound, redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import DashboardLayout from "../../_components/layouts/dashboard-layout";
import { getUser } from "@/lib/dal";

export default async function LocaleLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const user = await getUser();

  if (user?.role === "USER") {
    redirect(`/${locale}/dashboard`);
  }

  return (
    <DashboardLayout
      title={locale === "en" ? "User Management" : "Manajemen Pengguna"}
    >
      {children} {modal}
    </DashboardLayout>
  );
}
