"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { SearchX, ArrowLeftCircle } from "lucide-react";

export default function NotFoundPage() {
  const { locale } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-white to-slate-100 dark:from-gray-900 dark:to-black px-6">
      <SearchX className="w-20 h-20 text-muted-foreground mb-6 animate-bounce" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        404 - Halaman Tidak Ditemukan
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-md">
        Sepertinya halaman yang kamu cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        href={`/${locale}/dashboard`}
        className="mt-6 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-300"
      >
        <ArrowLeftCircle className="w-5 h-5 mr-2" />
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
