import { TParams } from "@/types";
import { redirect } from "next/navigation";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { locale } = await params;

  return redirect(`/${locale}/dashboard/student-affairs/consultations`);
};

export default Page;
