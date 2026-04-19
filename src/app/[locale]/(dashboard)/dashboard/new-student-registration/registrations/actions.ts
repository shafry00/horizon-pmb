/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import {
  parentInformationSchema,
  studentInformationSchema,
} from "@/lib/schema";
import {
  formatActionResultError,
  formatActionResultSuccess,
} from "@/lib/utils";
import { TActionResult } from "@/types";
import { revalidatePath } from "next/cache";

export async function updateStudentInformationById(
  id: number,
  formData: FormData
): Promise<TActionResult> {
  const rawDate = formData.get("dateOfBirth");
  const rawData = {
    fullName: formData.get("fullName"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
    instagramUsername: formData.get("instagramUsername"),
    placeOfBirth: formData.get("placeOfBirth"),
    dateOfBirth:
      typeof rawDate === "string" && rawDate !== "" ? new Date(rawDate) : null,
    gender: formData.get("gender"),
    religion: formData.get("religion"),
    domicileAddress: formData.get("domicileAddress"),
    province: formData.get("province"),
    districtOrCity: formData.get("districtOrCity"),
    subDistrict: formData.get("subDistrict"),
    village: formData.get("village"),
    institutionName: formData.get("institutionName"),
    graduationYear: formData.get("graduationYear"),
    maritalStatus: formData.get("maritalStatus"),
    employmentStatus: formData.get("employmentStatus"),
    studyProgramId: Number(formData.get("studyProgramId")),
  };

  const validation = studentInformationSchema.safeParse(rawData);

  if (!validation.success) {
    return formatActionResultError("Validation failed", {
      errors: validation.error.flatten().fieldErrors,
      inputValues: rawData,
      errorCode: 422,
    });
  }

  try {
    await prisma.pMB.update({
      where: { id },
      data: {
        ...validation.data,
        dateOfBirth: new Date(validation.data.dateOfBirth),
        studyProgramId: Number(validation.data.studyProgramId),
      },
    });

    revalidatePath(
      `/dashboard/new-student-registration/registrations/edit/${id}`
    );
    revalidatePath("/dashboard/new-student-registration/registrations");

    return formatActionResultSuccess(
      "Student information updated successfully",
      {
        inputValues: rawData,
      }
    );
  } catch (error) {
    console.error("❌ Error update student information:", error);
    return formatActionResultError("An error occurred while updating data", {
      errorCode: 500,
      inputValues: rawData,
    });
  }
}

export async function updateParentInformationById(
  id: number,
  formData: FormData
): Promise<TActionResult> {
  const rawScholarshipLetter = formData.get("scholarshipLetter");
  const rawAmbassadorName = formData.get("ambassadorName");

  let scholarshipLetter: string | null = null;
  if (typeof rawScholarshipLetter === "string") {
    scholarshipLetter = rawScholarshipLetter;
  } else if (
    rawScholarshipLetter instanceof File &&
    rawScholarshipLetter.name
  ) {
    scholarshipLetter = rawScholarshipLetter.name;
  }

  let ambassadorName: string | null = null;
  if (typeof rawAmbassadorName === "string") {
    ambassadorName =
      rawAmbassadorName.trim() === "" ? null : rawAmbassadorName.trim();
  }
  const rawData = {
    fatherName: formData.get("fatherName"),
    fatherOccupation: formData.get("fatherOccupation"),
    fatherContact: formData.get("fatherContact"),
    motherName: formData.get("motherName"),
    motherOccupation: formData.get("motherOccupation"),
    motherContact: formData.get("motherContact"),
    sourceInfoOfHorizonU: formData.get("sourceInfoOfHorizonU"),
    reasonChooseHorizonU: formData.get("reasonChooseHorizonU"),
    ambassadorName,
    scholarshipLetter,
  };

  const result = parentInformationSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Validasi gagal",
      errors: result.error.flatten().fieldErrors,
      inputValues: {
        ...rawData,
        id: id,
      },
    };
  }

  const data = result.data;

  try {
    await prisma.pMB.update({
      where: { id },
      data: {
        ...data,
      },
    });
    revalidatePath("/dashboard/pmb");

    return {
      success: true,
      message: "Data berhasil diperbarui.",
      inputValues: {
        ...rawData,
      },
    };
  } catch (error) {
    console.error("❌ Error update student information:", error);
    return {
      success: false,
      message: "Gagal memperbarui data.",
      errors: {
        _error: ["Terjadi kesalahan saat memperbarui data."],
      },
      inputValues: {
        ...rawData,
        id,
      },
    };
  }
}

export async function updateAssessmentAnswersById(
  pmbId: number,
  formData: FormData
): Promise<TActionResult> {
  try {
    const updates: {
      questionId: number;
      selectedOption: string;
    }[] = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("assessment-")) {
        const questionId = Number(key.split("assessment-")[1]);
        const selectedOption = value.toString();

        if (
          !["A", "B", "C", "D", "E"].includes(selectedOption) ||
          isNaN(questionId)
        )
          continue;

        updates.push({
          questionId,
          selectedOption,
        });
      }
    }

    await Promise.all(
      updates.map(async ({ questionId, selectedOption }) => {
        const existing = await prisma.assessmentAnswer.findFirst({
          where: {
            pmbId,
            questionId,
          },
        });

        if (existing) {
          await prisma.assessmentAnswer.update({
            where: {
              id: existing.id,
            },
            data: {
              selectedOption,
            },
          });
        } else {
          await prisma.assessmentAnswer.create({
            data: {
              pmbId,
              questionId,
              selectedOption,
            },
          });
        }
      })
    );

    revalidatePath("/dashboard/pmb");

    return {
      success: true,
      message: "Jawaban berhasil diperbarui.",
    };
  } catch (error) {
    console.error("❌ Error update assessment answers:", error);
    return {
      success: false,
      message: "Gagal menyimpan jawaban.",
      errors: {
        _error: ["Terjadi kesalahan saat menyimpan jawaban."],
      },
    };
  }
}

export async function deleteNewStudentRegistrationById(
  id: number
): Promise<TActionResult> {
  try {
    await prisma.pMB.delete({
      where: { id },
    });

    revalidatePath("/dashboard/new-student-registration/registrations");

    return {
      success: true,
      message: "Data PMB berhasil dihapus",
    };
  } catch (error: any) {
    console.error("DELETE ERROR", error);

    if (error.code === "P2025") {
      return {
        success: false,
        message: "Data PMB tidak ditemukan",
        errorCode: 404,
      };
    }

    return {
      success: false,
      message: "Terjadi kesalahan saat menghapus data PMB",
      errorCode: 500,
    };
  }
}
