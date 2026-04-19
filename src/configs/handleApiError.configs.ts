import { AxiosError } from "axios";

export const handleApiErrorWithAxios = (error: unknown): never => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const message =
        (error.response.data as { message?: string })?.message ||
        "An unexpected server error occurred.";
      console.error("🚨 API Error:", message);
    } else {
      console.error("🚨 Network Error:", error.message);
    }
  } else {
    console.error("❌ Unknown Error:", error);
  }

  throw error;
};

export const handleApiErrorWithFetch = async (
  res: Response
): Promise<never> => {
  let message = "An unexpected error occurred.";

  try {
    const body = await res.json();
    if (body?.message) {
      message = body.message;
    }
  } catch {
    message = res.statusText || message;
  }

  console.error("🚨 Fetch API Error:", message);
  throw new Error(message);
};
