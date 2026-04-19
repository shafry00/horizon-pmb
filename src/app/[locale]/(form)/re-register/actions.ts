"use server";

import { reRegisterFormSchema } from "@/lib/schema";
import prisma from "@/lib/prisma";
import { TActionResult } from "@/types";
import { validateCSRFToken } from "@/lib/csrf";
import { cookies } from "next/headers";

export async function createReRegister(
  _: unknown,
  formData: FormData
): Promise<TActionResult> {
  const csrfToken = formData.get("csrf_token")?.toString() || "";
  const cookieToken = (await cookies()).get("csrf_token")?.value || "";

  if (!validateCSRFToken(csrfToken, cookieToken)) {
    return {
      success: false,
      message: "Token CSRF tidak valid.",
      errors: {},
      inputValues: {},
    };
  }

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
      message: "Gagal menyimpan data. Mohon periksa kembali isian Anda.",
      errors: fieldErrors,
      inputValues: rawData,
    };
  }

  const captchaToken = formData.get("captcha_token")?.toString();

  if (!captchaToken) {
    return {
      success: false,
      message: "Captcha tidak ditemukan.",
      errorCode: 400,
      errors: {
        _form: ["Token captcha kosong atau tidak dikirim."],
      },
      inputValues: rawData,
    };
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const captchaRes = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secret}&response=${captchaToken}`,
    }
  );

  const captchaJson = await captchaRes.json();

  if (!captchaJson.success || captchaJson.score < 0.5) {
    return {
      success: false,
      message: "Verifikasi captcha gagal.",
      errorCode: 403,
      errors: {
        _form: ["Verifikasi reCAPTCHA gagal. Silakan coba lagi."],
      },
      inputValues: rawData,
    };
  }

  const { fullName, phoneNumber, email, studyProgramId, institutionName } =
    validation.data;

  const scholarshipLetterRaw = formData.get("scholarshipLetter");
  const scholarshipLetter =
    typeof scholarshipLetterRaw === "string" ? scholarshipLetterRaw : null;

  try {
    const saved = await prisma.reRegister.create({
      data: {
        fullName,
        phoneNumber,
        email,
        studyProgramId: Number(studyProgramId),
        institutionName,
        scholarshipLetter,
      },
    });

    return {
      success: true,
      message: "Berhasil menyimpan data",
      data: saved,
    };
  } catch (error) {
    console.error("❌ Failed to save data:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menyimpan data.",
      errorCode: 500,
      errors: {
        _form: ["Gagal menyimpan data ke database."],
      },
    };
  }
}
