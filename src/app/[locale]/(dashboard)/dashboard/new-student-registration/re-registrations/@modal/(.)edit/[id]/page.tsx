import { TParams } from "@/types";
import { getReRegistrationById } from "../../../services/server";
import ReRegisterForm from "../../../_components/re-register-form";
import { getStudyPrograms } from "@/app/[locale]/services/server";
import { redirect } from "next/navigation";

interface IEditModalProps {
  params: Promise<TParams>;
}

const EditModal = async ({ params }: IEditModalProps) => {
  const { id, locale } = await params;
  const reRegistrationById = await getReRegistrationById(Number(id));
  const { data: studyPrograms } = await getStudyPrograms();

  if (!reRegistrationById.success || !reRegistrationById.data) {
    if (locale === "en") {
      return redirect(
        "/en/dashboard/new-student-registration/re-registrations"
      );
    } else {
      return redirect(
        "/id/dashboard/new-student-registration/re-registrations"
      );
    }
  }
  return (
    <ReRegisterForm
      reRegistrationById={reRegistrationById.data}
      studyPrograms={studyPrograms}
    />
  );
};

export default EditModal;
