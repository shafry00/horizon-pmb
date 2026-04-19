import { TParams } from "@/types";
import DeleteForm from "../../../../../_components/delete-form";
import { deleteNewStudentRegistrationById } from "../../../actions";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { id, locale } = await params;

  return (
    <DeleteForm
      locale={locale}
      id={Number(id)}
      onDelete={deleteNewStudentRegistrationById}
    />
  );
};

export default Page;
