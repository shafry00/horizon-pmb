// lib/auth.ts
// import { Lucia, Session, User } from "lucia";
// import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
// import prisma from "./prisma";
// import { cache } from "react";
// import { cookies } from "next/headers";

// const adapter = new PrismaAdapter(prisma.session, prisma.user);

// export const lucia = new Lucia(adapter, {
//   sessionCookie: {
//     name: "session",
//     expires: false,
//     attributes: {
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       domain: process.env.NODE_ENV === "production" ? "example.com" : undefined,
//     },
//   },
//   getUserAttributes: (attributes) => {
//     return {
//       email: attributes.email,
//       role: attributes.role,
//     };
//   },
// });

// export const getUser = cache(
//   async (): Promise<
//     { user: User; session: Session } | { user: null; session: null }
//   > => {
//     const sessionId =
//       (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
//     if (!sessionId) {
//       return {
//         user: null,
//         session: null,
//       };
//     }

//     const result = await lucia.validateSession(sessionId);

//     try {
//       if (result.session && result.session.fresh) {
//         const sessionCookie = lucia.createSessionCookie(result.session.id);
//         (await cookies()).set(
//           sessionCookie.name,
//           sessionCookie.value,
//           sessionCookie.attributes
//         );
//       }
//       if (!result.session) {
//         const sessionCookie = lucia.createBlankSessionCookie();
//         (await cookies()).set(
//           sessionCookie.name,
//           sessionCookie.value,
//           sessionCookie.attributes
//         );
//       }
//     } catch {}
//     return result;
//   }
// );

// export async function getAuthUser() {
//   const cookieStore = cookies();
//   const sessionId = (await cookieStore).get("session_id")?.value;

//   if (!sessionId) return null;

//   const session = await prisma.session.findUnique({
//     where: { id: sessionId },
//     include: { user: true },
//   });

//   if (!session || session.expiresAt < new Date()) return null;

//   return session.user;
// }
