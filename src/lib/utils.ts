import { TActionResult } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface IgetContentByLocaleProps {
  locale: string;
  enContent: string | React.ReactNode;
  idContent: string | React.ReactNode;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFieldError(
  state: TActionResult,
  field: string
): string | undefined {
  return !state.success ? state.errors?.[field]?.[0] : undefined;
}

export function getInputValue(state: TActionResult, field: string): string {
  return state.success === false
    ? typeof state.inputValues?.[field] === "string"
      ? (state.inputValues[field] as string)
      : ""
    : "";
}

export const getContentByLocale = (props: IgetContentByLocaleProps) => {
  const { locale, enContent, idContent } = props;
  switch (locale) {
    case "en":
      return enContent;
    case "id":
      return idContent;
    default:
      return idContent;
  }
};

export const getFileNameFromPath = (path: string) => {
  return path?.split("/").pop() ?? "";
};

export const formatActionResultSuccess = <TData = unknown>(
  message: string,
  options?: {
    data?: TData;
    inputValues?: Record<string, unknown>;
  }
): TActionResult<TData> => {
  return {
    success: true,
    message,
    data: options?.data,
    inputValues: options?.inputValues,
  };
};

export const formatActionResultError = (
  message: string,
  options?: {
    errorCode?: number;
    errors?: Record<string, string[]>;
    inputValues?: Record<string, unknown>;
  }
): TActionResult => {
  return {
    success: false,
    message,
    errorCode: options?.errorCode,
    errors: options?.errors,
    inputValues: options?.inputValues,
  };
};

export function getDefaultInputValue(
  state: TActionResult,
  initialState: TActionResult,
  field: string
): string {
  return (
    (state?.inputValues?.[field] as string) ??
    (initialState?.inputValues?.[field] as string) ??
    ""
  );
}

export function removeLocalePrefix(path: string) {
  const parts = path.split("/");
  if (["id", "en"].includes(parts[1])) {
    return "/" + parts.slice(2).join("/");
  }
  return path;
}
