import React from "react";
import StudentInformationForm from "../../../../_components/student-information-form";
import {
  TAssessmentQuestion,
  TNewStudentRegistrationDetail,
  TStudyProgram,
} from "@/types";
import ParentInformationForm from "../../../../_components/parent-information-form";
import AssestmentTestForm from "../../../../_components/assestment-test-form";

interface IFormSectionProps {
  studentInformationById: TNewStudentRegistrationDetail;
  studyPrograms: TStudyProgram[];
  locale: string;
  assessments: TAssessmentQuestion[];
}

const FormSection: React.FC<IFormSectionProps> = (props) => {
  const { studentInformationById, studyPrograms, assessments, locale } = props;
  return (
    <section className="flex flex-col gap-4">
      <StudentInformationForm
        registration={studentInformationById}
        studyPrograms={studyPrograms}
        locale={locale}
      />
      <ParentInformationForm
        registration={studentInformationById}
        locale={locale}
      />
      <AssestmentTestForm
        locale={locale}
        registration={studentInformationById}
        assessments={assessments}
      />
    </section>
  );
};

export default FormSection;
