"use server";

import { TConsultationDetailResponse, TConsultationResponse } from "@/types";
import prisma from "../../../../../../../../lib/prisma";
import { verifySession } from "@/lib/dal";

export async function getConsultations(): Promise<TConsultationResponse> {
  await verifySession();

  try {
    const consultations = await prisma.consultation.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        relationshipWithRegistrant: true,
        createdAt: true,
      },
    });

    return { success: true, message: "success", data: consultations };
  } catch (error) {
    console.error("❌ Failed to get consultations:", error);
    return { success: false, message: "Failed to get consultations", data: [] };
  }
}

export async function getConsultationById(
  id: number
): Promise<TConsultationDetailResponse> {
  await verifySession();

  try {
    const consultation = await prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      return {
        success: false,
        message: "Data tidak ditemukan",
        data: null,
      };
    }

    return {
      success: true,
      message: "Berhasil mendapatkan data",
      data: consultation,
    };
  } catch (error) {
    console.error("Error saat mengambil data konsultasi:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
      data: null,
    };
  }
}
