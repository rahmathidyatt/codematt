import type { Metadata } from "next";
import { localizedPath, type Locale } from "./i18n";
export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: {
        id: localizedPath("id", path),
        en: localizedPath("en", path),
        "x-default": localizedPath("id", path),
      },
    },
  };
}
