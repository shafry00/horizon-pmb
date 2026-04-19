import React from "react";
import { TScholarshipDetail, TStudyProgram } from "@/types";
import ScholarshipForm from "../../../../_components/scholarship-form";
import AdditionalInformationForm from "../../../../_components/additional-information-form";

interface IFormSectionProps {
  scholarshipRegistrationById: TScholarshipDetail;
  studyPrograms: TStudyProgram[];
  locale: string;
}

const FormSection: React.FC<IFormSectionProps> = (props) => {
  const { scholarshipRegistrationById, studyPrograms, locale } = props;
  return (
    <section className="flex flex-col gap-4">
      <ScholarshipForm
        functionType="detail"
        scholarshipRegistrationById={scholarshipRegistrationById}
        studyPrograms={studyPrograms}
      />
      <AdditionalInformationForm
        functionType="detail"
        scholarshipRegistrationById={scholarshipRegistrationById}
        locale={locale}
      />
    </section>
  );
};

export default FormSection;
