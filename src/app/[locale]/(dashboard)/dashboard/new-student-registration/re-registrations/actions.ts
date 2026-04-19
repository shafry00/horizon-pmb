"use server";

import { reRegisterFormSchema } from "@/lib/schema";
import prisma from "@/lib/prisma";
import { TActionResult } from "@/types";
import { revalidatePath } from "next/cache";

export async function updateReRegister(
  id: number,
  formData: FormData
): Promise<TActionResult> {
  const rawData = {
    fullName: formData.get("fullName"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
    studyProgramId: formData.get("studyProgramId"),
    institutionName: formData.get("institutionName"),
    scholarshipLetter: formData.get("scholarshipLetter"),
  };

  const validation = reRegisterFormSchema.safeParse(rawData);

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Gagal memperbarui data. Mohon periksa kembali isian Anda.",
      errors: fieldErrors,
      inputValues: rawData,
    };
  }

  const { fullName, phoneNumber, email, studyProgramId, institutionName } =
    validation.data;

  const scholarshipLetterRaw = formData.get("scholarshipLetter");
  const scholarshipLetter =
    typeof scholarshipLetterRaw === "string" ? scholarshipLetterRaw : null;

  try {
    const updated = await prisma.reRegister.update({
      where: { id },
      data: {
        fullName,
        phoneNumber,
        email,
        studyProgramId: Number(studyProgramId),
        institutionName,
        scholarshipLetter,
      },
    });

    revalidatePath("/dashboard/re-registers");

    return {
      success: true,
      message: "Berhasil memperbarui data",
      data: updated,
    };
  } catch (error) {
    console.error("❌ Failed to update data:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat memperbarui data.",
      errorCode: 500,
      errors: {
        _form: ["Gagal memperbarui data di database."],
      },
    };
  }
}

export async function deleteReRegistrationById(
  id: number
): Promise<TActionResult> {
  try {
    await prisma.reRegister.delete({
      where: { id },
    });

    revalidatePath("/dashboard/new-student-registration/re-registrations");

    return {
      success: true,
      message: "Berhasil menghapus data.",
    };
  } catch (error) {
    console.error("❌ Failed to delete re-register data:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menghapus data.",
      errorCode: 500,
      errors: {
        _form: ["Gagal menghapus data di database."],
      },
    };
  }
}
