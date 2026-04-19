"use server";

import prisma from "@/lib/prisma";
import { TAssessmentQuestionResponse, TStudyProgramResponse } from "@/types";

export async function getStudyPrograms(): Promise<TStudyProgramResponse> {
  try {
    const data = await prisma.studyProgram.findMany({
      orderBy: { name: "asc" },
    });

    return {
      success: true,
      message: "Berhasil mengambil data program studi.",
      data,
    };
  } catch (error) {
    console.error("❌ Failed to fetch study programs:", error);

    return {
      success: false,
      message: "Gagal mengambil data program studi.",
      data: [],
    };
  }
}

export async function getAssessmentQuestions(): Promise<TAssessmentQuestionResponse> {
  try {
    const questions = await prisma.assessmentQuestion.findMany({
      select: {
        id: true,
        question: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        optionE: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      success: true,
      message: "Pertanyaan berhasil diambil",
      data: questions,
    };
  } catch (error) {
    console.error("Gagal mengambil pertanyaan:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengambil pertanyaan",
      data: [],
    };
  }
}
