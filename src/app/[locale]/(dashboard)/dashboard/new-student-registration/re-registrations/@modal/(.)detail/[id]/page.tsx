import { TParams } from "@/types";
import { getReRegistrationById } from "../../../services/server";
import ReRegisterForm from "../../../_components/re-register-form";
import { getStudyPrograms } from "@/app/[locale]/services/server";
import { redirect } from "next/navigation";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
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
      functionType="detail"
    />
  );
};

export default Page;
