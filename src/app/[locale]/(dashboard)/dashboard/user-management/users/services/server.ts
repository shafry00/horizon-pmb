import { TUser, TResponseResult, TResponseError } from "@/types";
import prisma from "@/lib/prisma";

export async function getUsers(): Promise<TResponseResult<TUser[]>> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data: TUser[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    return {
      success: true,
      message: "Users fetched successfully.",
      data,
      error: null,
    };
  } catch (error: unknown) {
    let errorMessage = "An error occurred while fetching users.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    const responseError: TResponseError = {
      code: 500,
      message: errorMessage,
    };

    return {
      success: false,
      message: "Failed to fetch users.",
      data: [],
      error: responseError,
    };
  }
}

export async function getUserById(
  id: string
): Promise<TResponseResult<TUser | null>> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      const responseError: TResponseError = {
        code: 404,
        message: "User not found.",
      };

      return {
        success: false,
        message: "User not found.",
        data: null,
        error: responseError,
      };
    }

    const data: TUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    return {
      success: true,
      message: "User fetched successfully.",
      data,
      error: null,
    };
  } catch (error: unknown) {
    let errorMessage = "An error occurred while fetching user.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    const responseError: TResponseError = {
      code: 500,
      message: errorMessage,
    };

    return {
      success: false,
      message: "Failed to fetch user.",
      data: null,
      error: responseError,
    };
  }
}
