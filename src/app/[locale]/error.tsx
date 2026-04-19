"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const router = useRouter();
  const { locale } = useParams();

  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-white to-slate-100 dark:from-gray-900 dark:to-black px-6">
      <AlertTriangle className="w-20 h-20 text-yellow-500 mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Terjadi Kesalahan
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-md">
        Maaf, terjadi kesalahan tak terduga saat memuat halaman ini. Kamu bisa
        mencoba lagi atau kembali ke beranda.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Coba Lagi
        </button>
        <button
          onClick={() => router.push(`/${locale}/dashboard`)}
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
