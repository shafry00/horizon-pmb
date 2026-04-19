import { z } from "zod";
import {
  studentInformationSchema,
  parentInformationSchema,
  assestmentAnswerSchema,
} from "@/lib/schema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateCSRFToken } from "@/lib/csrf";
import { cookies } from "next/headers";

const formSchema = z.object({
  studentInformation: studentInformationSchema,
  parentInformation: parentInformationSchema,
  assessmentAnswer: assestmentAnswerSchema,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      body.honeypot &&
      typeof body.honeypot === "string" &&
      body.honeypot.trim() !== ""
    ) {
      return NextResponse.json(
        { success: false, message: "Bot detected via honeypot" },
        { status: 400 }
      );
    }

    delete body.honeypot;

    const csrfToken = body.csrf_token || "";
    const cookieToken = (await cookies()).get("csrf_token")?.value || "";

    if (!validateCSRFToken(csrfToken, cookieToken)) {
      return NextResponse.json(
        {
          success: false,
          message: "Token CSRF tidak valid.",
        },
        { status: 403 }
      );
    }

    if (typeof body?.studentInformation?.dateOfBirth === "string") {
      body.studentInformation.dateOfBirth = new Date(
        body.studentInformation.dateOfBirth
      );
    }

    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const captchaToken = body.captcha_token;

    if (!captchaToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Captcha tidak ditemukan.",
          errors: {
            _form: ["Token captcha kosong atau tidak dikirim."],
          },
        },
        { status: 400 }
      );
    }

    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      }
    );

    const captchaJson = await captchaRes.json();
    if (!captchaJson.success || captchaJson.score < 0.5) {
      return NextResponse.json(
        {
          success: false,
          message: "Verifikasi captcha gagal.",
          errors: {
            _form: ["Verifikasi reCAPTCHA gagal. Silakan coba lagi."],
          },
        },
        { status: 403 }
      );
    }

    const { studentInformation, parentInformation, assessmentAnswer } =
      parsed.data;

    const created = await prisma.pMB.create({
      data: {
        studyProgramId: studentInformation.studyProgramId,
        fullName: studentInformation.fullName,
        phoneNumber: studentInformation.phoneNumber,
        instagramUsername: studentInformation.instagramUsername,
        placeOfBirth: studentInformation.placeOfBirth,
        dateOfBirth: new Date(studentInformation.dateOfBirth),
        gender: studentInformation.gender,
        religion: studentInformation.religion,
        domicileAddress: studentInformation.domicileAddress,
        province: studentInformation.province,
        districtOrCity: studentInformation.districtOrCity,
        subDistrict: studentInformation.subDistrict,
        village: studentInformation.village,
        institutionName: studentInformation.institutionName,
        graduationYear: studentInformation.graduationYear,
        maritalStatus: studentInformation.maritalStatus,
        employmentStatus: studentInformation.employmentStatus,

        fatherName: parentInformation.fatherName,
        fatherOccupation: parentInformation.fatherOccupation,
        fatherContact: parentInformation.fatherContact,
        motherName: parentInformation.motherName,
        motherOccupation: parentInformation.motherOccupation,
        motherContact: parentInformation.motherContact,
        sourceInfoOfHorizonU: parentInformation.sourceInfoOfHorizonU,
        reasonChooseHorizonU: parentInformation.reasonChooseHorizonU,
        ambassadorName: parentInformation.ambassadorName,
        scholarshipLetter:
          typeof parentInformation.scholarshipLetter === "string"
            ? parentInformation.scholarshipLetter
            : null,

        assessmentAnswers: {
          createMany: {
            data: Object.entries(assessmentAnswer.answer).map(
              ([questionId, selectedOption]) => ({
                questionId: Number(questionId),
                selectedOption,
              })
            ),
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
