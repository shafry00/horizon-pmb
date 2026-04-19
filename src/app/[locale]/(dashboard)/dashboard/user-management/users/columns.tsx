"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { TUser } from "@/types";

export const columns = (
  locale: string,
  userRole: "USER" | "ADMIN" | "SUPER_ADMIN"
): ColumnDef<TUser>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: locale === "en" ? "Role" : "Peran",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.role.toLowerCase()}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: locale === "en" ? "Date Created" : "Tanggal Dibuat",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    id: "actions",
    header: locale === "en" ? "Actions" : "Aksi",
    cell: ({ row }) => {
      const data = row.original;
      const isStaff = userRole === "USER";
      return (
        <div className="flex items-center gap-2">
          {isStaff ? null : (
            <>
              {" "}
              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                asChild
              >
                <Link href={`/dashboard/user-management/users/edit/${data.id}`}>
                  <Edit className="w-4 h-4 mr-1" />
                  {locale === "en" ? "Edit" : "Edit"}
                </Link>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="hover:bg-red-700"
                asChild
              >
                <Link
                  href={`/dashboard/user-management/users/delete/${data.id}`}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {locale === "en" ? "Delete" : "Hapus"}
                </Link>
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];
