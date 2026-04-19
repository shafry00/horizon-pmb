import { TParams } from "@/types";

import { redirect } from "next/navigation";
import { getConsultationById } from "../../../services/server";
import ConsultationForm from "../../../_components/consultation-form";
import { getUser } from "@/lib/dal";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { id, locale } = await params;
  const consultationById = await getConsultationById(Number(id));

  const user = await getUser();

  if (!user || user.role === "USER") {
    return redirect(`/${locale}/dashboard/student-affairs/consultations`);
  }

  if (!id || !consultationById.success || !consultationById.data) {
    return redirect(`/${locale}/dashboard/consultations`);
  }

  return (
    <ConsultationForm
      consultationById={consultationById.data}
      locale={locale}
      page="edit"
    />
  );
};

export default Page;
