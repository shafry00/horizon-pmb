import React from "react";
import ReRegisterForm from "../re-register-form";
import SubTitleBadge from "../../../../(public)/_components/sub-title-badge";
import { StudyProgram } from "@/types";

interface IFormSectionProps {
  subHeading: string;
  heading: string;
  description: string;
  studyPrograms: StudyProgram[];
}

const FormSection: React.FC<IFormSectionProps> = (props) => {
  const { subHeading, heading, description, studyPrograms } = props;

  return (
    <section className="flex flex-col gap-8 lg:gap-10">
      <article className="flex flex-col gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7">
        <div className="flex flex-col items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 text-center">
          <SubTitleBadge subTitle={subHeading} />
          <h2 className="text-[32px] leading-9 text-black tracking-[-1px] capitalize mt-2">
            {heading}
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <p>{description}</p>
        </div>
      </article>
      <ReRegisterForm studyPrograms={studyPrograms} />
    </section>
  );
};

export default FormSection;
