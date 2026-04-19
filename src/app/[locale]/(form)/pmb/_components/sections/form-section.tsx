import React from "react";
import PMBStepper from "../pmb-stepper";
import { StudyProgram, TAssessmentQuestion } from "@/types";
import SubTitleBadge from "../../../../_components/sub-title-badge";

interface IFormSectionProps {
  subHeading: string;
  heading: string;
  bodyTitle1: string;
  bodyTitle2: string;
  bodyTitle3: string;
  bodyStep1: string;
  bodyStep2: string;
  bodyStep3: string;
  bodyContact1: string;
  bodyContact2: string;
  bodyContact3: string;
  assessments: TAssessmentQuestion[];
  studyPrograms: StudyProgram[];
  locale: string;
}

const FormSection: React.FC<IFormSectionProps> = (props) => {
  const {
    subHeading,
    heading,
    bodyTitle1,
    bodyTitle2,
    bodyTitle3,
    bodyStep1,
    bodyStep2,
    bodyStep3,
    bodyContact1,
    bodyContact2,
    bodyContact3,
    assessments,
    studyPrograms,
    locale,
  } = props;
  return (
    <section>
      <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7">
        <div className="flex flex-col items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 text-center">
          <SubTitleBadge subTitle={subHeading} />
          <h2 className="text-[32px] leading-9 text-black tracking-[-1px] capitalize mt-2">
            {heading}
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 lg:gap-3">
            <p className="text-[16px] lg:text-[20px] leading-[18px] lg:leading-6">
              {bodyTitle1}
            </p>
            <ol className="list-decimal text-[12px] lg:text-[16px] lg:leading-5 leading-4 text-black pl-[14px] flex flex-col gap-1">
              <li>{bodyStep1}</li>
              <li>{bodyStep2}</li>
              <li>{bodyStep3}</li>
            </ol>
          </div>
          <div
            className="text-[16px] lg:text-[20px] leading-[18px] lg:leading-6"
            dangerouslySetInnerHTML={{ __html: bodyTitle2 }}
          />
          <div className="flex flex-col gap-3">
            <p className="highlight-text-2 text-[16px] lg:text-[20px] leading-[18px] lg:leading-6">
              {bodyTitle3}
            </p>
            <ul className="list-disc text-[12px] lg:text-[16px] lg:leading-5 leading-4 text-black pl-[16px] flex flex-col gap-1">
              <li>{bodyContact1}</li>
              <li>{bodyContact2}</li>
              <li>{bodyContact3}</li>
            </ul>
          </div>
        </div>
      </div>
      <PMBStepper
        locale={locale}
        assessments={assessments}
        studyPrograms={studyPrograms}
      />
    </section>
  );
};

export default FormSection;
