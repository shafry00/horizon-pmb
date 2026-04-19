"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "../../columns";
import { TNewStudentRegistration } from "@/types";

interface ITableSectionProps {
  locale: string;
  newStudentRegistrations: TNewStudentRegistration[];
  userRole: "USER" | "ADMIN" | "SUPER_ADMIN";
}

const TableSection: React.FC<ITableSectionProps> = (props) => {
  const { locale, newStudentRegistrations, userRole } = props;
  return (
    <section>
      <DataTable
        columns={columns(userRole, locale)}
        data={newStudentRegistrations}
        filterColumn="fullName"
        filterPlaceholder="Cari nama lengkap..."
      />
    </section>
  );
};

export default TableSection;
