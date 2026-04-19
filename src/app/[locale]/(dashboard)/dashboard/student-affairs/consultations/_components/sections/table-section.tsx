"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "../../columns";
import { TConsultationResponse } from "@/types";

interface ITableSectionProps {
  locale: string;
  consultations: TConsultationResponse;
  userRole: "USER" | "ADMIN" | "SUPER_ADMIN";
}

const TableSection: React.FC<ITableSectionProps> = (props) => {
  const { locale, consultations, userRole } = props;
  return (
    <section>
      <DataTable
        columns={columns(userRole, locale)}
        data={consultations.data || []}
        filterColumn="fullName"
        filterPlaceholder={locale === "en" ? "Search name..." : "Cari nama..."}
      />
    </section>
  );
};

export default TableSection;
