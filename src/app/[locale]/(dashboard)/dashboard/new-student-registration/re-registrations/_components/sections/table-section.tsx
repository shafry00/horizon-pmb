"use client";

import React from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "../../columns";
import { TReRegistration } from "@/types";

interface ITableSectionProps {
  reRegistrations: TReRegistration[];
  locale: string;
  userRole: "USER" | "ADMIN" | "SUPER_ADMIN";
}

const TableSection: React.FC<ITableSectionProps> = (props) => {
  const { locale, reRegistrations, userRole } = props;
  return (
    <section>
      <DataTable
        columns={columns(userRole, locale)}
        data={reRegistrations}
        filterColumn="fullName"
        filterPlaceholder={locale === "en" ? "Search name..." : "Cari nama..."}
      />
    </section>
  );
};

export default TableSection;
