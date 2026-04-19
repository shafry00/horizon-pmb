import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import prisma from "@/lib/prisma"; // pastikan prisma kamu diimport

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  sessionId: string;
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt,
    },
  });

  const encryptedSession = await encrypt({ sessionId, userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session", encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const cookie = (await cookies()).get("session")?.value;
  const payload = await decrypt(cookie);

  if (!cookie || !payload) {
    return null;
  }

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  await prisma.session.update({
    where: { id: payload.sessionId },
    data: { expiresAt },
  });

  // 2. Update cookie
  const cookieStore = cookies();
  (await cookieStore).set("session", cookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return;
  }

  const payload = await decrypt(sessionCookie);

  if (!payload?.userId) {
    return;
  }

  await prisma.session.deleteMany({
    where: { id: payload.sessionId },
  });

  cookieStore.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    sameSite: "lax",
    path: "/",
  });
}
