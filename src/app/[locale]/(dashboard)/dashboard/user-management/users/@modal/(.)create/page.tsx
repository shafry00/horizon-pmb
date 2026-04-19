import { TParams } from "@/types";

import UserForm from "../../_components/user-form";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { locale } = await params;

  return <UserForm userById={null} locale={locale} mode="CREATE" />;
};

export default Page;
