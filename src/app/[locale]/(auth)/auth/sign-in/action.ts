"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import { signInSchema } from "@/lib/schema";
import prisma from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import { TActionResult } from "@/types";

export async function SignIn(
  _: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const validate = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
    },
  });

  if (!existingUser) {
    return {
      error: "Email not found",
    };
  }

  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existingUser.password
  );

  if (!comparePassword) {
    return {
      error: "Email/Password is incorrect",
    };
  }

  // const sessionId = crypto.randomUUID();

  // await prisma.session.create({
  //   data: {
  //     id: sessionId,
  //     userId: existingUser.id,
  //     expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Session aktif 30 hari
  //   },
  // });

  // (await cookies()).set("session_id", sessionId, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   path: "/",
  //   maxAge: 30 * 24 * 60 * 60, // 30 hari
  // });

  await createSession(existingUser.id);

  return redirect("/id/dashboard");
}

export async function signOut(): Promise<TActionResult> {
  try {
    await deleteSession();

    return {
      success: true,
      message: "Sign out successfully.",
    };
  } catch (error) {
    console.error("SignOut failed", error);

    return {
      success: false,
      message: "Failed to sign out. Please try again.",
      errorCode: 500,
    };
  }
}
