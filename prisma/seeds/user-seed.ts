import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function userSeed() {
  const users = [
    {
      name: "Super Admin",
      email: "superadmin@microad.co.id",
      password: "microad123",
      role: "SUPER_ADMIN",
    },
    {
      name: "Admin",
      email: "admin@microad.co.id",
      password: "microad123",
      role: "ADMIN",
    },
    {
      name: "User",
      email: "user@microad.co.id",
      password: "microad1233",
      role: "USER",
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role as "SUPER_ADMIN" | "ADMIN" | "USER",
      },
    });
  }
}
