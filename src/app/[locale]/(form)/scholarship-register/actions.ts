"use server";

import { scholarshipRegisterFormSchema } from "@/lib/schema";

import { validateSchema } from "@/lib/zod-validator";
import prisma from "@/lib/prisma";

export async function createScholarship(data: unknown, captchaToken?: string) {
  if (!captchaToken) {
    return {
      success: false,
      message: "Captcha tidak valid.",
    };
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${captchaToken}`,
  });

  const json = await res.json();

  if (!json.success || json.score < 0.5) {
    return {
      success: false,
      message: "Gagal verifikasi captcha.",
    };
  }
  const result = validateSchema(scholarshipRegisterFormSchema, data);

  if (!result.success) {
    return {
      success: false,
      errors: result.errors,
    };
  }

  const {
    scholarshipInfo: {
      fullName,
      phoneNumber,
      email,
      instagramUsername,
      institutionName,
      classOrMajor,
      birthDate,
      province,
      districtOrCity,
      subDistrict,
      village,
      fullAddress,
      fatherContact,
      motherContact,
      studyProgramId,
      currentStatus,
    },
    additionalInfo: {
      currentProvince,
      totalFamilyMembers,
      hasFamilySavings,
      houseFloorMaterial,
      consumedMeatLastWeek,
      consumedFriedRiceLastWeek,
      boughtLaundrySuppliesLastMonth,
      boughtFuelLastMonth,
      hasRefrigerator,
      hasCar,
    },
  } = result.data;

  try {
    const parsedStudyProgramId = parseInt(studyProgramId as string, 10);

    const scholarship = await prisma.scholarship.create({
      data: {
        fullName,
        phoneNumber,
        email,
        instagramUsername,
        institutionName,
        classOrMajor,
        birthDate,
        province,
        districtOrCity,
        subDistrict,
        village,
        fullAddress,
        fatherContact,
        motherContact,
        studyProgramId: parsedStudyProgramId,
        currentStatus,
        currentProvince,
        totalFamilyMembers,
        hasFamilySavings,
        houseFloorMaterial,
        consumedMeatLastWeek,
        consumedFriedRiceLastWeek,
        boughtLaundrySuppliesLastMonth,
        boughtFuelLastMonth,
        hasRefrigerator,
        hasCar,
      },
    });

    return {
      success: true,
      data: scholarship,
    };
  } catch (error) {
    console.error("❌ Failed to create consultation:", error);
    return {
      success: false,
      message: "Gagal menyimpan data konsultasi.",
    };
  }
}
