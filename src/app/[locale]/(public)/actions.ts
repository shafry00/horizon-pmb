"use server";

import { validateCSRFToken } from "@/lib/csrf";
import { sendConsultationEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { consultationSchema } from "@/lib/schema";
import { TActionResult } from "@/types";
import { cookies } from "next/headers";

export async function createConsultation(
  _: unknown,
  formData: FormData
): Promise<TActionResult> {
  const cookieStore = await cookies();
  const csrfToken = formData.get("csrf_token")?.toString() || "";
  const cookieToken = cookieStore.get("csrf_token")?.value || "";

  if (!validateCSRFToken(csrfToken, cookieToken)) {
    return {
      success: false,
      message: "Token CSRF tidak valid.",
      errors: {},
      inputValues: {},
    };
  }

  const honeypot = formData.get("website");
  if (honeypot) {
    return {
      success: false,
      message: "Bot terdeteksi.",
      errorCode: 400,
      errors: {
        _form: ["Bot submission rejected."],
      },
    };
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
    const fieldErrors = validation.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Mohon periksa kembali data yang Anda isi.",
      errorCode: 422,
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

  const {
    fullName,
    email,
    phoneNumber,
    instagramUsername,
    relationshipWithRegistrant,
  } = validation.data;

  try {
    const consultation = await prisma.consultation.create({
      data: {
        fullName,
        email,
        phoneNumber,
        instagramUsername: instagramUsername ?? null,
        relationshipWithRegistrant,
      },
    });

    await sendConsultationEmail({
      to: email,
      fullName,
    });

    return {
      success: true,
      message:
        "Data Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.",
      data: consultation,
    };
  } catch (error) {
    console.error("❌ Failed to create consultation:", error);

    return {
      success: false,
      message:
        "Terjadi kesalahan saat menyimpan data. Silakan coba lagi nanti.",
      errorCode: 500,
      errors: {
        _form: [
          "Gagal menyimpan data ke sistem. Mohon coba beberapa saat lagi.",
        ],
      },
    };
  }
}

export async function updateConsultation(
  _: unknown,
  formData: FormData
): Promise<TActionResult> {
  const rawId = formData.get("id");
  const id = Number(rawId);

  if (!id || isNaN(id)) {
    return {
      success: false,
      message: "ID tidak valid.",
      errorCode: 400,
      errors: {
        id: ["ID tidak valid atau tidak ditemukan."],
      },
    };
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
    const fieldErrors = validation.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Mohon periksa kembali data yang Anda isi.",
      errorCode: 422,
      errors: fieldErrors,
      inputValues: {
        ...rawData,
        id: rawId,
      },
    };
  }

  const {
    fullName,
    email,
    phoneNumber,
    instagramUsername,
    relationshipWithRegistrant,
  } = validation.data;

  try {
    const updated = await prisma.consultation.update({
      where: { id },
      data: {
        fullName,
        email,
        phoneNumber,
        instagramUsername: instagramUsername ?? null,
        relationshipWithRegistrant,
      },
    });

    return {
      success: true,
      message: "Data Anda berhasil diperbarui.",
      data: updated,
    };
  } catch (error) {
    console.error("❌ Failed to update consultation:", error);

    return {
      success: false,
      message: "Gagal memperbarui data. Silakan coba lagi nanti.",
      errorCode: 500,
      errors: {
        _form: ["Terjadi kesalahan saat memperbarui data."],
      },
    };
  }
}
