import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";
import prisma from "./prisma";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const payload = await decrypt(cookie);

  if (!payload?.userId || !payload?.sessionId) {
    return null;
  }

  return { isAuth: true, userId: payload?.userId as string, role: "USER" };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await prisma.user.findFirst({ where: { id: session.userId } });
    return user;
  } catch (error) {
    console.log("Failed to fetch user", error);
    return null;
  }
});
