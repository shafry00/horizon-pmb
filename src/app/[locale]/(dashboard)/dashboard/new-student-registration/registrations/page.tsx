import React from "react";
import { getRegistrations } from "./services/server";
import { TParams } from "@/types";
import TableSection from "./_components/sections/table-section";
import { getProfileDTO } from "@/lib/dto";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const { data: newStudentRegistrations } = await getRegistrations();
  const { role: userRole } = await getProfileDTO();

  return (
    <main>
      <TableSection
        userRole={userRole}
        locale={locale}
        newStudentRegistrations={newStudentRegistrations}
      />
    </main>
  );
};

export default Page;
