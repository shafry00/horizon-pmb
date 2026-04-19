import { TParams } from "@/types";
import DeleteForm from "../../../../../_components/delete-form";
import { deleteConsultation } from "../../../actions";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { id, locale } = await params;
  const user = await getUser();

  if (!user || user.role === "USER") {
    return redirect(`/${locale}/dashboard/student-affairs/consultations`);
  }
  return (
    <DeleteForm locale={locale} id={Number(id)} onDelete={deleteConsultation} />
  );
};

export default Page;
