"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { TScholarship } from "@/types";

export const columns = (
  userRole: "USER" | "ADMIN" | "SUPER_ADMIN",
  locale: string
): ColumnDef<TScholarship>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "fullName",
    header: locale === "en" ? "Full Name" : "Nama Lengkap",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.fullName}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "studyProgram.name",
    header: locale === "en" ? "Study Program" : "Program Studi",
    cell: ({ row }) => row.original.studyProgram.name,
  },
  {
    accessorKey: "createdAt",
    header: locale === "en" ? "Date Registered" : "Tanggal Daftar",
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

      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-gray-100 text-gray-700"
            asChild
          >
            <Link
              href={`/dashboard/student-affairs/scholarship-registrations/detail/${data.id}`}
            >
              <Eye className="w-4 h-4 mr-1" />
              {locale === "en" ? "Detail" : "Detail"}
            </Link>
          </Button>
          {userRole === "USER" ? null : (
            <>
              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                asChild
              >
                <Link
                  href={`/dashboard/student-affairs/scholarship-registrations/edit/${data.id}`}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {locale === "en" ? "Edit" : "Edit"}
                </Link>
              </Button>
              <Button
                size={"sm"}
                variant={"destructive"}
                className="hover:bg-red-700"
                asChild
              >
                <Link
                  href={`/dashboard/student-affairs/scholarship-registrations/delete/${data.id}`}
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
