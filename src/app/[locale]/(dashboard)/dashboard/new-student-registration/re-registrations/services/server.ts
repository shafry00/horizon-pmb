import prisma from "@/lib/prisma";
import {
  TReRegistration,
  TReRegistrationDetailResponse,
  TResponseError,
  TResponseResult,
} from "@/types";

export async function getReRegistrations(): Promise<
  TResponseResult<TReRegistration[]>
> {
  try {
    const reRegisters = await prisma.reRegister.findMany({
      include: {
        studyProgram: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      message: "success",
      data: reRegisters,
      error: null,
    };
  } catch (error) {
    let errorMessage =
      "An error occurred while fetching scholarship registrations.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    const responseError: TResponseError = {
      code: 500,
      message: errorMessage,
    };

    return {
      success: false,
      message: "Failed to fetch scholarship registrations.",
      data: [],
      error: responseError,
    };
  }
}

export async function getReRegistrationById(
  id: number
): Promise<TReRegistrationDetailResponse> {
  try {
    const reRegister = await prisma.reRegister.findUnique({
      where: { id },
      include: {
        studyProgram: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!reRegister) {
      return {
        success: false,
        message: `Data dengan ID ${id} tidak ditemukan.`,
        data: null,
      };
    }

    return {
      success: true,
      message: "Berhasil mengambil data",
      data: reRegister,
    };
  } catch (error) {
    console.error("❌ Failed to get reRegister by ID:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengambil data.",
      data: null,
    };
  }
}
