import prisma from "@/lib/prisma";
import {
  TApiResponse,
  TResponseError,
  TResponseResult,
  TScholarship,
  TScholarshipDetail,
} from "@/types";

export async function getScholarshipRegistrations(): Promise<
  TResponseResult<TScholarship[]>
> {
  try {
    const data = await prisma.scholarship.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        institutionName: true,
        studyProgram: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      message: "Scholarship registrations fetched successfully.",
      data,
      error: null,
    };
  } catch (error: unknown) {
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

export async function getScholarshipRegistrationById(
  id: number
): Promise<TApiResponse<TScholarshipDetail>> {
  try {
    const data = await prisma.scholarship.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        email: true,
        instagramUsername: true,
        institutionName: true,
        classOrMajor: true,
        birthDate: true,
        province: true,
        districtOrCity: true,
        subDistrict: true,
        village: true,
        fullAddress: true,
        fatherContact: true,
        motherContact: true,
        currentStatus: true,
        currentProvince: true,
        totalFamilyMembers: true,
        hasFamilySavings: true,
        houseFloorMaterial: true,
        consumedMeatLastWeek: true,
        consumedFriedRiceLastWeek: true,
        boughtLaundrySuppliesLastMonth: true,
        boughtFuelLastMonth: true,
        hasRefrigerator: true,
        hasCar: true,
        createdAt: true,
        updatedAt: true,
        studyProgramId: true,
        studyProgram: {
          select: { name: true },
        },
      },
    });

    if (!data) {
      return {
        status: "error",
        message: `Beasiswa dengan ID ${id} tidak ditemukan`,
        data: null,
        error: "NotFound",
      };
    }

    return {
      status: "success",
      message: "Detail beasiswa berhasil diambil",
      data,
      error: null,
    };
  } catch (error: unknown) {
    let errorMessage = "Terjadi kesalahan saat mengambil detail beasiswa";
    if (error instanceof Error) errorMessage = error.message;

    return {
      status: "error",
      message: "Gagal mengambil detail beasiswa",
      data: null,
      error: errorMessage,
    };
  }
}
