"use client";

import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "../../columns";
import { TUser } from "@/types";
import { PlusIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface ITableSectionProps {
  users: TUser[];
  locale: string;
  userRole: "USER" | "ADMIN" | "SUPER_ADMIN";
}

const TableSection: React.FC<ITableSectionProps> = (props) => {
  const { users, locale, userRole } = props;

  return (
    <section>
      <Link
        className="flex items-center gap-2"
        href="/dashboard/user-management/users/create"
      >
        <PlusIcon />
        <span className="hidden lg:inline">Add User</span>
      </Link>
      <DataTable
        columns={columns(locale, userRole)}
        data={users}
        filterColumn="email"
        filterPlaceholder={
          locale === "en" ? "Search email..." : "Cari email..."
        }
      />
    </section>
  );
};

export default TableSection;
