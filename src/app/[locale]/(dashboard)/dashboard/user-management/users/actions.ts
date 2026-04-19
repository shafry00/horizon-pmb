"use server";

import prisma from "@/lib/prisma";
import { TActionResult } from "@/types";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import { createUserSchema, updateUserSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function deleteUserById(id: string): Promise<TActionResult> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return {
        success: false,
        message: "User not found.",
        errorCode: 404,
        errors: {
          userId: ["User with this ID does not exist."],
        },
      };
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: "User deleted successfully.",
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An error occurred while deleting the user.";
    const errorCode = 500;

    return {
      success: false,
      message: "Failed to delete user.",
      errorCode,
      errors: {
        userId: [errorMessage],
      },
    };
  }
}

export async function createUser(formData: FormData): Promise<TActionResult> {
  try {
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const roleRaw = formData.get("role")?.toString().toUpperCase();
    const role = roleRaw as Role;

    const validation = createUserSchema.safeParse({
      name,
      email,
      password,
      role,
    });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      return {
        success: false,
        message: "Please check the provided data.",
        errors: fieldErrors,
        inputValues: validation.data,
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email is already registered.",
        errors: {
          email: ["This email is already in use."],
        },
      };
    }

    const hashedPassword = await bcrypt.hash(validation.data.password, 10);

    await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        password: hashedPassword,
        role: validation.data.role,
      },
    });

    revalidatePath("/dashboard/user-management/users");

    return {
      success: true,
      message: "User created successfully.",
      data: validation.data,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An error occurred while creating the user.";
    const errorCode = 500;

    return {
      success: false,
      message: "Failed to create user.",
      errorCode,
      errors: {
        form: [errorMessage],
      },
    };
  }
}

export async function updateUserById(
  id: string,
  formData: FormData
): Promise<TActionResult> {
  try {
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const passwordRaw = formData.get("password")?.toString();
    const isPasswordProvided = passwordRaw && passwordRaw.trim() !== "";
    const roleRaw = formData.get("role")?.toString().toUpperCase();
    const role = roleRaw as Role;

    const validation = updateUserSchema.safeParse({
      name,
      email,
      password: isPasswordProvided ? passwordRaw : undefined,
      role,
    });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      return {
        success: false,
        message: "Please check the provided data.",
        errors: fieldErrors,
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return {
        success: false,
        message: "User not found.",
        errorCode: 404,
        errors: {
          userId: ["User with this ID does not exist."],
        },
      };
    }

    const updateData: {
      email?: string;
      name?: string;
      password?: string;
      role?: Role;
    } = {
      email: validation.data.email,
      name: validation.data.name,
      role: validation.data.role,
    };

    if (isPasswordProvided) {
      const hashedPassword = await bcrypt.hash(passwordRaw!, 10);
      updateData.password = hashedPassword;
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: "User updated successfully.",
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An error occurred while updating the user.";
    const errorCode = 500;

    return {
      success: false,
      message: "Failed to update user.",
      errorCode,
      errors: {
        form: [errorMessage],
      },
    };
  }
}
