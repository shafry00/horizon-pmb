import { TParams } from "@/types";
import DeleteForm from "./_components/delete-form";
interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { id, locale } = await params;

  return <DeleteForm locale={locale} id={id || ""} />;
};

export default Page;
