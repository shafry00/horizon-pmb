import { TParams } from "@/types";
import React from "react";
import { getRegistrationById } from "../../services/server";
import { redirect } from "next/navigation";
import {
  getAssessmentQuestions,
  getStudyPrograms,
} from "@/app/[locale]/services/server";

import FormSection from "./_components/sections/form-section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { id, locale } = await params;
  const { data: registrationById } = await getRegistrationById(Number(id));
  const { data: studyPrograms } = await getStudyPrograms();
  const { data: assessments } = await getAssessmentQuestions();

  if (!registrationById) {
    if (locale === "en") {
      return redirect("/en/dashboard/registration");
    } else {
      return redirect("/id/dashboard/registration");
    }
  }

  return (
    <main className="flex flex-col gap-4">
      <div className="w-full">
        <Button
          asChild
          variant="outline"
          className="text-[14px] shadow-md leading-[18px] font-medium cursor-pointer text-black capitalize w-fit rounded-[8px] bg-primary-foreground border-[#F1F1F1] border flex items-center justify-center h-full gap-4 py-[6px] pr-[6px]"
        >
          <Link href={"/dashboard/new-student-registration/registrations"}>
            {locale === "en" ? "Back" : "Kembali"}
            <span className="w-9 aspect-square flex items-center justify-center bg-black rounded">
              <ArrowLeft className="size-6 text-primary-foreground" />
            </span>
          </Link>
        </Button>
      </div>
      <FormSection
        studentInformationById={registrationById}
        studyPrograms={studyPrograms}
        locale={locale}
        assessments={assessments}
      />
    </main>
  );
};

export default Page;
