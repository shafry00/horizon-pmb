import React, { Suspense } from "react";
import TableSection from "./_components/sections/table-section";
import { getScholarshipRegistrations } from "./services/server";
import { TParams } from "@/types";
import { getProfileDTO } from "@/lib/dto";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { locale } = await params;
  const scholarshipRegistrations = await getScholarshipRegistrations();
  const { role: userRole } = await getProfileDTO();
  if (!scholarshipRegistrations.data) return null;
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <TableSection
          scholarshipRegistrations={scholarshipRegistrations.data}
          locale={locale}
          userRole={userRole}
        />
      </Suspense>
    </main>
  );
};

export default Page;
