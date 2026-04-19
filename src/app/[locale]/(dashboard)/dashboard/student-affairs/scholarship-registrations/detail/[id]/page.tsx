import React from "react";
import { getScholarshipRegistrationById } from "../../services/server";
import { TParams } from "@/types";
import FormSection from "./_components/sections/form-section";
import { redirect } from "next/navigation";
import { getStudyPrograms } from "../../../../../../services/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { id, locale } = await params;
  const scholarshipRegistrationById = await getScholarshipRegistrationById(
    Number(id)
  );
  const { data: studyPrograms } = await getStudyPrograms();

  if (!scholarshipRegistrationById.data) {
    return redirect(
      `/${locale}/dashboard/student-affairs/scholarship-registrations`
    );
  }

  return (
    <main className="flex flex-col gap-4">
      <div className="w-full">
        <Button
          asChild
          variant="outline"
          className="text-[14px] shadow-md leading-[18px] font-medium cursor-pointer text-black capitalize w-fit rounded-[8px] bg-primary-foreground border-[#F1F1F1] border flex items-center justify-center h-full gap-4 py-[6px] pr-[6px]"
        >
          <Link href={"/dashboard/student-affairs/scholarship-registrations"}>
            {locale === "en" ? "Back" : "Kembali"}
            <span className="w-9 aspect-square flex items-center justify-center bg-black rounded">
              <ArrowLeft className="size-6 text-primary-foreground" />
            </span>
          </Link>
        </Button>
      </div>
      <FormSection
        scholarshipRegistrationById={scholarshipRegistrationById.data}
        studyPrograms={studyPrograms}
        locale={locale}
      />
    </main>
  );
};

export default Page;
