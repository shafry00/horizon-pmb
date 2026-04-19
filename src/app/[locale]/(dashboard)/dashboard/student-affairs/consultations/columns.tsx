"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { RELATIONSHIP_WITH_REGISTRANT_ITEMS } from "@/constants";
import { TConsultation } from "@/types";

export const columns = (
  userRole: "USER" | "ADMIN" | "SUPER_ADMIN",
  locale: string
): ColumnDef<TConsultation>[] => [
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
    accessorKey: "relationshipWithRegistrant",
    header:
      locale === "en"
        ? "Relationship With Registrant"
        : "Hubungan Dengan Pendaftar",
    cell: ({ row }) => {
      const value = row.original.relationshipWithRegistrant;
      const label = RELATIONSHIP_WITH_REGISTRANT_ITEMS.find(
        (item) => item.value === value
      );

      return (
        <span className="capitalize">
          {locale === "en" ? label?.label_en : label?.label_id ?? "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: locale === "en" ? "Date" : "Tanggal Daftar",
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
      const consultation = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-gray-100 text-gray-700"
            asChild
          >
            <Link
              href={`/dashboard/student-affairs/consultations/detail/${consultation.id}`}
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
                  href={`/dashboard/student-affairs/consultations/edit/${consultation.id}`}
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
                  href={`/dashboard/student-affairs/consultations/delete/${consultation.id}`}
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
