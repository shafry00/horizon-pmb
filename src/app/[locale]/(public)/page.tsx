import StudentOpinionSection from "./_components/sections/student-opinion-section";
import AboutUsSection from "./_components/sections/about-us-section";
import BenefitSection from "./_components/sections/benefit-section";
import FacilitySection from "./_components/sections/facility-section";
import HeroSection from "./_components/sections/hero-section";
import PartnerSection from "./_components/sections/partner-section";
import NewStudentRegistrationProcedureSection from "./_components/sections/new-student-registration-procedure-section";
import StudyProgramSection from "./_components/sections/study-program-section";
import ConsultationSection from "./_components/sections/consultation-section";
import { getTranslations } from "next-intl/server";
import { TParams } from "@/types";
import RegistrationBrochureSection from "./_components/sections/registration-brochure-section";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const dynamicParams = true;
export const revalidate = 300;

interface IPageProps {
  params: Promise<TParams>;
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("PAGE.PUBLIC.HOME-PAGE.METADATA");

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`),
    title: `${t("title")}`,
    description: t("description"),
    keywords: [
      t("KEYWORDS.key-1"),
      t("KEYWORDS.key-2"),
      t("KEYWORDS.key-3"),
      t("KEYWORDS.key-4"),
      t("KEYWORDS.key-5"),
    ],
    openGraph: {
      title: `${t("OPEN-GRAPH.title")}`,
      description: t("OPEN-GRAPH.description"),
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
      type: "website",
      images: [
        {
          url: "/assets/images/public/home/hero-banner-image.webp",
          width: 1200,
          height: 630,
          alt: "Hero Banner Image",
        },
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
      languages: routing.locales.reduce(
        (acc, loc) => ({
          ...acc,
          [loc]: `${process.env.NEXT_PUBLIC_BASE_URL}/${loc}`,
        }),
        {}
      ),
    },
    robots: "index, follow",
  };
}

const Page = async ({ params }: IPageProps) => {
  const t = await getTranslations("PAGE.PUBLIC.HOME-PAGE");

  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    name: `${t("METADATA.OPEN-GRAPH.title")}`,
    description: `${t("METADATA.description")}`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
    image: "/assets/images/public/home/hero-banner-image.webp",
    inLanguage: `${locale}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="w-full mx-auto">
        <HeroSection
          heading={t("SECTION.HERO-SECTION.heading")}
          body={t("SECTION.HERO-SECTION.body")}
          ctaButtonLabel1={t("SECTION.HERO-SECTION.CTA-BUTTON.cta-btn-1")}
          ctaButtonLabel2={t("SECTION.HERO-SECTION.CTA-BUTTON.cta-btn-2")}
          ctaButtonLabel3={t("SECTION.HERO-SECTION.CTA-BUTTON.cta-btn-3")}
        />
        <PartnerSection heading={t("SECTION.PARTNER-SECTION.heading")} />
        <BenefitSection />
        <FacilitySection />
        <StudyProgramSection />
        <NewStudentRegistrationProcedureSection
          subTitle={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.sub-title"
          )}
          firstStep={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-1.label"
          )}
          secondStep={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-2.label"
          )}
          thirdStep={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-3.label"
          )}
          firstStepTitle={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-1.title"
          )}
          secondStepTitle={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-2.title"
          )}
          thirdStepTitle={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-3.title"
          )}
          firstStepDescription={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-1.description"
          )}
          secondStepDescription={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-2.description"
          )}
          thirdStepDescription={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-3.description"
          )}
          firstStepCTABTN1={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-1.CTA-BUTTON.cb-1"
          )}
          firstStepCTABTN2={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-1.CTA-BUTTON.cb-2"
          )}
          secondStepCTABTN1={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-2.CTA-BUTTON.cb-1"
          )}
          thirdStepCTABTN1={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-3.CTA-BUTTON.cb-1"
          )}
          thirdStepCTABTN2={t(
            "SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE-SECTION.NEW-STUDENT-REGISTRATION-PROCEDURE.STEP-3.CTA-BUTTON.cb-2"
          )}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 p-3 gap-4 w-full">
          <AboutUsSection />
          <RegistrationBrochureSection
            title={t("SECTION.REGISTRATION-BROCHURE-SECTION.title")}
            subTitle={t("SECTION.REGISTRATION-BROCHURE-SECTION.sub-title")}
            brochureLabel1={t(
              "SECTION.REGISTRATION-BROCHURE-SECTION.BROCHURE-LIST.b1"
            )}
            brochureLabel2={t(
              "SECTION.REGISTRATION-BROCHURE-SECTION.BROCHURE-LIST.b2"
            )}
            brochureLabelDownload={t(
              "SECTION.REGISTRATION-BROCHURE-SECTION.download-button-label"
            )}
          />
        </div>
        <StudentOpinionSection
          heading={t.raw("SECTION.STUDENT-OPTION-SECTION.heading")}
          subHeading={t("SECTION.STUDENT-OPTION-SECTION.sub-heading")}
        />
        <ConsultationSection
          subTitle={t("SECTION.CONSULTATION-SECTION.sub-heading")}
          heading={t.raw("SECTION.CONSULTATION-SECTION.heading")}
          locale={locale}
        />
      </main>
    </>
  );
};

export default Page;
