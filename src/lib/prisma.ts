// import { PrismaClient } from "@prisma/client";

// let prisma: PrismaClient;

// declare const globalThis: {
//   prisma: PrismaClient;
// };

// const isProd = process.env.NODE_ENV === "production";
// const isDev = process.env.NODE_ENV === "development";

// if (isProd || isDev) {
//   prisma = new PrismaClient();
// } else {
//   if (!globalThis.prisma) {
//     globalThis.prisma = new PrismaClient();
//   }

//   prisma = globalThis.prisma;
// }

// export default prisma;

// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"], // bisa tambahkan ["query"] saat debug
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
