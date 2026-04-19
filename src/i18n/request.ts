import { getRequestConfig } from "next-intl/server";
import { Formats, hasLocale, IntlErrorCode } from "next-intl";
import { routing } from "./routing";

export const formats = {
  dateTime: {
    short: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
  list: {
    enumeration: {
      style: "long",
      type: "conjunction",
    },
  },
} satisfies Formats;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.error(error);
      } else {
        console.error("Unexpected i18n error:", error);
      }
    },

    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join(".");

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return path + " is not yet translated";
      } else {
        return "Dear developer, please fix this message: " + path;
      }
    },

    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
