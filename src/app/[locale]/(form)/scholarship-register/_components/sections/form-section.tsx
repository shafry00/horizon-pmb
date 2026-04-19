import React from "react";
import ScholarshipRegisterStepper from "../scholarship-register-stepper";
import SubTitleBadge from "../../../../_components/sub-title-badge";
import { TStudyProgram } from "@/types";

interface IFormSectionProps {
  subTitle: string;
  title: string;
  locale: string;
  studyPrograms: TStudyProgram[];
}

const FormSection: React.FC<IFormSectionProps> = (props) => {
  const { subTitle, title, locale, studyPrograms } = props;
  return (
    <section className="padding-x-global padding-y-global flex flex-col  gap-4 md:gap-[22px] lg:gap-[28px] xl:gap-[34px] 2xl:gap-10">
      <div className="flex flex-col items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 text-center">
        <SubTitleBadge subTitle={subTitle} />
        <h2 className="text-[32px] leading-9 text-black tracking-[-1px] capitalize mt-2">
          {title}
        </h2>
      </div>
      <ScholarshipRegisterStepper
        studyPrograms={studyPrograms}
        locale={locale}
      />
    </section>
  );
};

export default FormSection;
