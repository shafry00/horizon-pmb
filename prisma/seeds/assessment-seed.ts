import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function assessmentSeed() {
  const questions = [
    {
      question: "Mengapa kamu ingin melanjutkan pendidikan tinggi?",
      optionA: "Karena keinginan orang tua",
      optionB: "Untuk mendapat pekerjaan lebih baik",
      optionC: "Karena ikut-ikutan teman",
      optionD: "Untuk mengembangkan diri dan pengetahuan",
      optionE: "Tidak tahu pasti",
    },
    {
      question: "Apa yang paling kamu sukai saat belajar?",
      optionA: "Mendengarkan penjelasan guru",
      optionB: "Diskusi kelompok",
      optionC: "Mengerjakan soal latihan",
      optionD: "Melihat video atau gambar",
      optionE: "Praktek langsung",
    },
    {
      question: "Apa tujuan utamamu kuliah di Horizon University?",
      optionA: "Karena dekat dari rumah",
      optionB: "Karena fasilitasnya lengkap",
      optionC: "Karena teman-teman juga kuliah di sana",
      optionD: "Karena kurikulumnya sesuai minat",
      optionE: "Karena mendapatkan beasiswa",
    },
  ];

  for (const q of questions) {
    await prisma.assessmentQuestion.upsert({
      where: { question: q.question },
      update: {},
      create: q,
    });
  }
}
