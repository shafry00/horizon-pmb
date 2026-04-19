"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, FileText, XCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { TNewStudentRegistration } from "@/types";

export const columns = (
  userRole: "USER" | "ADMIN" | "SUPER_ADMIN",
  locale: string
): ColumnDef<TNewStudentRegistration>[] => [
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
    accessorKey: "phoneNumber",
    header: "Telepon",
  },
  {
    accessorKey: "studyProgram.name",
    header: locale === "en" ? "Study Program" : "Program Studi",
    cell: ({ row }) => row.original.studyProgram.name,
  },
  {
    accessorKey: "scholarshipLetter",
    header: locale === "en" ? "Scholarship Letter" : "Surat Beasiswa",
    cell: ({ row }) => {
      const hasFile = !!row.original.scholarshipLetter;

      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            hasFile ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {hasFile ? (
            <>
              <FileText size={14} />
              Terlampir
            </>
          ) : (
            <>
              <XCircle size={14} />
              Tidak ada
            </>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Daftar",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const newStudentRegistration = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-gray-100 text-gray-700"
            asChild
          >
            <Link
              href={`/dashboard/new-student-registration/registrations/detail/${newStudentRegistration.id}`}
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
                  href={`/dashboard/new-student-registration/registrations/edit/${newStudentRegistration.id}`}
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
                  href={`/dashboard/new-student-registration/registrations/delete/${newStudentRegistration.id}`}
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
