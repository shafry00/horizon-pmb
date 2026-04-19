import React, { Suspense } from "react";
import { TParams } from "@/types";
import TableSection from "./_components/sections/table-section";
import { getUsers } from "./services/server";
import { getProfileDTO } from "@/lib/dto";

interface IPageProps {
  params: Promise<TParams>;
}

const Page = async ({ params }: IPageProps) => {
  const { locale } = await params;

  const { data: users } = await getUsers();
  const profile = await getProfileDTO();

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <TableSection
          users={users}
          locale={locale}
          userRole={profile?.role ?? "USER"}
        />
      </Suspense>
    </main>
  );
};

export default Page;
