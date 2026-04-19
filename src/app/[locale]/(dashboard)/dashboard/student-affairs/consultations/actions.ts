"use server";

import { getUser, verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { consultationSchema } from "@/lib/schema";
import {
  formatActionResultError,
  formatActionResultSuccess,
} from "@/lib/utils";
import { TActionResult } from "@/types";
import { revalidatePath } from "next/cache";

export async function updateConsultationById(
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
    email: formData.get("email"),
    relationshipWithRegistrant: formData.get("relationshipWithRegistrant"),
    phoneNumber: formData.get("phoneNumber"),
    instagramUsername: formData.get("instagramUsername"),
  };

  const validation = consultationSchema.safeParse(rawData);

  if (!validation.success) {
    return formatActionResultError("Validation failed", {
      errors: validation.error.flatten().fieldErrors,
      inputValues: rawData,
      errorCode: 422,
    });
  }

  try {
    await prisma.consultation.update({
      where: { id },
      data: {
        ...validation.data,
      },
    });

    revalidatePath("/dashboard/student-affairs/consultations");

    return formatActionResultSuccess("Consultation updated successfully", {
      inputValues: rawData,
    });
  } catch (error) {
    console.error("❌ Failed to update consultation:", error);

    return formatActionResultError("An error occurred while updating data", {
      errorCode: 500,
      inputValues: rawData,
    });
  }
}

export async function deleteConsultation(id: number) {
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
    const deleted = await prisma.consultation.delete({
      where: { id },
    });

    revalidatePath("/dashboard/student-affairs/consultations");

    return {
      success: true,
      message: "Consultation deleted successfully",
      data: deleted,
    };
  } catch (error) {
    console.error("❌ Failed to delete consultation:", error);
    return {
      success: false,
      message: "Failed to delete consultation",
      data: null,
    };
  }
}
