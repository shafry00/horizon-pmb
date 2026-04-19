import { getTranslations } from "next-intl/server";
import React from "react";
import HeroSection from "./_components/sections/hero-section";
import FormSection from "./_components/sections/form-section";
import {
  getAssessmentQuestions,
  getStudyPrograms,
} from "../../services/server";
import { TParams } from "@/types";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const t = await getTranslations("PAGE.PMB-PAGE");
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const academicYear = `${currentYear}/${nextYear}`;
  const { data: assessmentQuestions } = await getAssessmentQuestions();
  const { data: studyPrograms } = await getStudyPrograms();

  return (
    <main className="w-full mx-auto p-3">
      <div className="bg-[#F7F7F9] rounded-[20px] padding-x-global padding-y-global flex flex-col gap-10">
        <HeroSection />
        <FormSection
          heading={t("SECTION.FORM-SECTION.heading", {
            year: academicYear,
          })}
          subHeading={t("SECTION.FORM-SECTION.sub-heading", {
            year: academicYear,
          })}
          bodyTitle1={t(
            "SECTION.FORM-SECTION.BODY.NEW-STUDENT-REGISTRATION-STAGE.title"
          )}
          bodyTitle2={t.raw("SECTION.FORM-SECTION.BODY.REGISTRATION-FEE.title")}
          bodyTitle3={t.raw("SECTION.FORM-SECTION.BODY.CONTACT.title")}
          bodyStep1={t(
            "SECTION.FORM-SECTION.BODY.NEW-STUDENT-REGISTRATION-STAGE.STEP.step-1"
          )}
          bodyStep2={t(
            "SECTION.FORM-SECTION.BODY.NEW-STUDENT-REGISTRATION-STAGE.STEP.step-2"
          )}
          bodyStep3={t(
            "SECTION.FORM-SECTION.BODY.NEW-STUDENT-REGISTRATION-STAGE.STEP.step-3"
          )}
          bodyContact1={t(
            "SECTION.FORM-SECTION.BODY.CONTACT.CONTACT.contact-1"
          )}
          bodyContact2={t(
            "SECTION.FORM-SECTION.BODY.CONTACT.CONTACT.contact-2"
          )}
          bodyContact3={t(
            "SECTION.FORM-SECTION.BODY.CONTACT.CONTACT.contact-3"
          )}
          assessments={assessmentQuestions}
          studyPrograms={studyPrograms}
          locale={locale}
        />
      </div>
    </main>
  );
};

export default Page;
