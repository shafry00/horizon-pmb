import React, { Suspense } from "react";

import { getReRegistrations } from "./services/server";

import TableSection from "./_components/sections/table-section";
import { TParams } from "@/types";
import { getProfileDTO } from "@/lib/dto";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const { data: reRegistrations } = await getReRegistrations();
  const { role: userRole } = await getProfileDTO();

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <TableSection
          userRole={userRole}
          locale={locale}
          reRegistrations={reRegistrations}
        />
      </Suspense>
    </main>
  );
};

export default Page;
