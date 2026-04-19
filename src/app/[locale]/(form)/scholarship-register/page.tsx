import { getTranslations } from "next-intl/server";
import React from "react";
import HeroSection from "./_components/sections/hero-section";
import FormSection from "./_components/sections/form-section";
import { TParams } from "@/types";
import { getStudyPrograms } from "../../services/server";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const t = await getTranslations("PAGE.FORM-MODULE.SCHOLARSHIP-REGISTER-PAGE");
  const { data: studyPrograms } = await getStudyPrograms();
  return (
    <main className="w-full mx-auto p-3">
      <div className="bg-[#F7F7F9] rounded-[20px] padding-x-global padding-y-global">
        <HeroSection />
        <FormSection
          studyPrograms={studyPrograms}
          locale={locale}
          subTitle={t("SECTION.FORM-SECTION.sub-title")}
          title={t("SECTION.FORM-SECTION.title")}
        />
      </div>
    </main>
  );
};

export default Page;
