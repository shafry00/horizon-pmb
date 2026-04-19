import DeleteForm from "../../../../../../dashboard/_components/delete-form";
import { TParams } from "@/types";
import { deleteScholarshipRegistrationById } from "../../../actions";
import { getUser } from "@/lib/dal";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { id, locale } = await params;

  const user = await getUser();

  if (!user || user.role === "USER") {
    return null;
  }

  return (
    <DeleteForm
      locale={locale}
      id={Number(id)}
      onDelete={deleteScholarshipRegistrationById}
    />
  );
};

export default Page;
