"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "../../columns";
import { TScholarship } from "@/types";

interface ITableSectionProps {
  scholarshipRegistrations: TScholarship[];
  locale: string;
  userRole: "USER" | "ADMIN" | "SUPER_ADMIN";
}

const TableSection: React.FC<ITableSectionProps> = (props) => {
  const { scholarshipRegistrations, locale, userRole } = props;
  return (
    <section>
      <DataTable
        columns={columns(userRole, locale)}
        data={scholarshipRegistrations}
        filterColumn="fullName"
        filterPlaceholder={locale === "en" ? "Search name..." : "Cari nama..."}
      />
    </section>
  );
};

export default TableSection;
