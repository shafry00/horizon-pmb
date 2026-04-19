import { TParams } from "@/types";

import { redirect } from "next/navigation";
import UserForm from "../../../_components/user-form";
import { getUserById } from "../../../services/server";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { id, locale } = await params;
  const userById = await getUserById(id || "");

  if (!id || !userById.success || !userById.data) {
    return redirect(`/${locale}/dashboard/users`);
  }

  return <UserForm userById={userById.data} locale={locale} mode="EDIT" />;
};

export default Page;
