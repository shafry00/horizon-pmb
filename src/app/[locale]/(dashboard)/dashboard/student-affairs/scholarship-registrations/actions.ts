"use server";

import { getUser, verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";
import {
  additionalInformationFormSchema,
  scholarshipFormSchema,
} from "@/lib/schema";
import {
  formatActionResultError,
  formatActionResultSuccess,
} from "@/lib/utils";
import { TActionResult } from "@/types";
import { revalidatePath } from "next/cache";

export async function updateScholarshipById(
  id: number,
  formData: FormData
): Promise<TActionResult> {
  const session = await verifySession();

  if (!session) {
    return formatActionResultError("Not authenticated", {
      errorCode: 401,
    });
  }

  const user = await getUser();

  if (!user || user.role === "USER") {
    return formatActionResultError("Forbidden: insufficient permissions", {
      errorCode: 403,
    });
  }

  const rawData = {
    fullName: formData.get("fullName"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
    instagramUsername: formData.get("instagramUsername"),
    institutionName: formData.get("institutionName"),
    classOrMajor: formData.get("classOrMajor"),
    birthDate: formData.get("birthDate"),
    province: formData.get("province"),
    districtOrCity: formData.get("districtOrCity"),
    village: formData.get("village"),
    subDistrict: formData.get("subDistrict"),
    fullAddress: formData.get("fullAddress"),
    fatherContact: formData.get("fatherContact"),
    motherContact: formData.get("motherContact"),
    studyProgramId: formData.get("studyProgramId"),
    currentStatus: formData.get("currentStatus"),
  };

  const validation = scholarshipFormSchema.safeParse(rawData);

  if (!validation.success) {
    return formatActionResultError("Validation failed", {
      errors: validation.error.flatten().fieldErrors,
      inputValues: rawData,
      errorCode: 422,
    });
  }

  const { studyProgramId, ...otherData } = validation.data;

  try {
    await prisma.scholarship.update({
      where: { id },
      data: {
        ...otherData,
        studyProgram: {
          connect: { id: parseInt(studyProgramId) },
        },
      },
    });

    revalidatePath("/dashboard/student-affairs/scholarship-registrations");
    revalidatePath(
      `/dashboard/student-affairs/scholarship-registrations/edit/${id}`
    );

    return formatActionResultSuccess("Scholarship updated successfully", {
      inputValues: rawData,
    });
  } catch (error) {
    console.error("❌ Error updateScholarshipById:", error);
    return formatActionResultError("An error occurred while updating data", {
      errorCode: 500,
      inputValues: rawData,
    });
  }
}

export async function updateAdditionalInformationById(
  id: number,
  formData: FormData
): Promise<TActionResult> {
  const session = await verifySession();

  if (!session) {
    return formatActionResultError("Not authenticated", {
      errorCode: 401,
    });
  }

  const user = await getUser();

  if (!user || user.role === "USER") {
    return formatActionResultError("Forbidden: insufficient permissions", {
      errorCode: 403,
    });
  }

  const rawData = {
    currentProvince: formData.get("currentProvince"),
    totalFamilyMembers: formData.get("totalFamilyMembers"),
    hasFamilySavings: formData.get("hasFamilySavings"),
    houseFloorMaterial: formData.get("houseFloorMaterial"),
    consumedMeatLastWeek: formData.get("consumedMeatLastWeek"),
    consumedFriedRiceLastWeek: formData.get("consumedFriedRiceLastWeek"),
    boughtLaundrySuppliesLastMonth: formData.get(
      "boughtLaundrySuppliesLastMonth"
    ),
    boughtFuelLastMonth: formData.get("boughtFuelLastMonth"),
    hasRefrigerator: formData.get("hasRefrigerator"),
    hasCar: formData.get("hasCar"),
  };

  const validation = additionalInformationFormSchema.safeParse(rawData);

  if (!validation.success) {
    return formatActionResultError("Validation failed", {
      errors: validation.error.flatten().fieldErrors,
      inputValues: rawData,
      errorCode: 422,
    });
  }

  try {
    await prisma.scholarship.update({
      where: { id },
      data: {
        ...validation.data,
      },
    });

    revalidatePath("/dashboard/student-affairs/scholarship-registrations");
    revalidatePath(
      `/dashboard/student-affairs/scholarship-registrations/edit/${id}`
    );

    return formatActionResultSuccess(
      "Additional Information updated successfully",
      {
        inputValues: rawData,
      }
    );
  } catch (error) {
    console.error("❌ Error updateAdditionalInformationById:", error);
    return formatActionResultError("An error occurred while updating data", {
      errorCode: 500,
      inputValues: rawData,
    });
  }
}

export async function deleteScholarshipRegistrationById(id: number) {
  const session = await verifySession();

  if (!session) {
    return formatActionResultError("Not authenticated", {
      errorCode: 401,
    });
  }

  const user = await getUser();

  if (!user || user.role === "USER") {
    return formatActionResultError("Forbidden: insufficient permissions", {
      errorCode: 403,
    });
  }

  try {
    const deleted = await prisma.scholarship.delete({
      where: { id },
    });

    revalidatePath("/dashboard/student-affairs/scholarship-registrations");

    return {
      success: true,
      message: "Scholarship Registration deleted successfully",
      data: deleted,
    };
  } catch (error) {
    console.error("❌ Failed to delete Scholarship Registration:", error);
    return {
      success: false,
      message: "Failed to delete Scholarship Registration",
      data: null,
    };
  }
}
