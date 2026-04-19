import { assessmentSeed } from "./seeds/assessment-seed";
import { studyProgramSeed } from "./seeds/study-program-seed";
import { userSeed } from "./seeds/user-seed";

async function main() {
  await studyProgramSeed();
  await userSeed();
  await assessmentSeed();
}

main()
  .then(() => {})
  .catch((err) => {
    console.error("❌ Gagal seeding:", err);
    process.exit(1);
  });
