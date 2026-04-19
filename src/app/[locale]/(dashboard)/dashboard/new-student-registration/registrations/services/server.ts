import prisma from "@/lib/prisma";

import {
  TNewStudentRegistrationDetailResponse,
  TNewStudentRegistrationResponse,
} from "@/types"; // pastikan path sesuai

export async function getRegistrations(): Promise<TNewStudentRegistrationResponse> {
  try {
    const data = await prisma.pMB.findMany({
      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        scholarshipLetter: true,
        createdAt: true,
        studyProgram: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      message: "Data pendaftaran berhasil diambil",
      data, // ← TypeScript akan pastikan ini sesuai dengan TNewStudentRegistration[]
    };
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return {
      success: false,
      message: "Gagal mengambil data pendaftaran",
      data: [],
    };
  }
}

export async function getRegistrationById(
  id: number
): Promise<TNewStudentRegistrationDetailResponse> {
  try {
    const data = await prisma.pMB.findUnique({
      where: { id },
      include: {
        studyProgram: {
          select: {
            id: true,
            name: true,
          },
        },
        assessmentAnswers: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!data) {
      return {
        success: false,
        message: "Data tidak ditemukan",
        data: null,
      };
    }

    return {
      success: true,
      message: "Data berhasil diambil",
      data,
    };
  } catch (error) {
    console.error("Error fetching registration by id:", error);
    return {
      success: false,
      message: "Gagal mengambil data pendaftaran",
      data: null,
    };
  }
}
