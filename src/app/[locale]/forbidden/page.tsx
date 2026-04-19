"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ShieldAlert, ArrowLeftCircle } from "lucide-react";

export default function ForbiddenPage() {
  const { locale } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-red-50 via-white to-slate-100 dark:from-gray-900 dark:to-black">
      <div className="flex flex-col items-center gap-4">
        <ShieldAlert className="text-red-500 w-20 h-20 animate-pulse" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          403 - Forbidden
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          Kamu tidak memiliki izin untuk mengakses halaman ini. Silakan kembali
          ke halaman utama atau hubungi administrator jika ini adalah kesalahan.
        </p>
        <Link
          href={`/${locale}/dashboard`}
          className="inline-flex items-center mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-300"
        >
          <ArrowLeftCircle className="w-5 h-5 mr-2" />
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
