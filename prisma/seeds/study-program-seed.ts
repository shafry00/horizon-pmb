import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function studyProgramSeed() {
  const studyPrograms = [
    { name: "S1 Sistem Informasi" },
    { name: "S1 Informatika" },
    { name: "S1 Akutansi" },
    { name: "S1 Manajemen" },
    { name: "S1 Pariwisata" },
    { name: "S1 Kebidanan" },
    { name: "S1 Keperawatan" },
    { name: "D3 Keperawatan" },
    { name: "D3 Kebidanan" },
    { name: "Profesi Bidan Alumni" },
    { name: "Profesi Bidan External" },
    { name: "S1 Kebidanan Non Reg (D3 ke S1)" },
  ];

  for (const program of studyPrograms) {
    await prisma.studyProgram.upsert({
      where: { name: program.name },
      update: {},
      create: program,
    });
  }
}
