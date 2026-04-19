import React from "react";

import { getConsultations } from "./services/server";
import { TParams } from "@/types";
import TableSection from "./_components/sections/table-section";
import { getProfileDTO } from "@/lib/dto";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const consultations = await getConsultations();
  const { locale } = await params;
  const { role: userRole } = await getProfileDTO();

  return (
    <main>
      <TableSection
        consultations={consultations}
        locale={locale}
        userRole={userRole}
      />
    </main>
  );
};

export default Page;
