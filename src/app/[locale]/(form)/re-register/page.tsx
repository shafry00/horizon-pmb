import { getTranslations } from "next-intl/server";
import React from "react";
import HeroSection from "./_components/sections/hero-section";
import FormSection from "./_components/sections/form-section";
import { getStudyPrograms } from "../../services/server";

const Page = async () => {
  const t = await getTranslations("PAGE.RE-REGISTER-PAGE");

  const { data: studyPrograms } = await getStudyPrograms();

  // if (!success || !studyPrograms || studyPrograms.length === 0) {
  //   return (
  //     <main className="w-full mx-auto p-3">
  //       <div className="bg-[#F7F7F9] rounded-[20px] padding-x-global padding-y-global">
  //         <HeroSection />
  //         <p className="text-center text-red-500 mt-6">
  //           {message || "Gagal memuat data program studi."}
  //         </p>
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <main className="w-full mx-auto p-3">
      <div className="bg-[#F7F7F9] rounded-[20px] padding-x-global padding-y-global">
        <HeroSection />
        <FormSection
          heading={t("SECTION.FORM-SECTION.heading")}
          subHeading={t("SECTION.FORM-SECTION.sub-heading")}
          description={t("SECTION.FORM-SECTION.BODY.body-1")}
          studyPrograms={studyPrograms}
        />
      </div>
    </main>
  );
};

export default Page;
