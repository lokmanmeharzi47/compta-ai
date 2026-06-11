import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/** Locales that should render with a right-to-left layout. */
export const rtlLocales: Locale[] = ["ar"];

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  fr: "ltr",
  ar: "rtl",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Always prefix the URL with the locale so we get clean /fr and /ar routes.
  localePrefix: "always",
  // Detect the user's language from the Accept-Language header / NEXT_LOCALE cookie.
  localeDetection: true,
});
