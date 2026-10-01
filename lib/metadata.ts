import { siteOrigin } from "./site-url";
import type { Metadata } from "next";
import { localizedPath, type Locale } from "./i18n";
export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
): Metadata {
  const parts = path.split("/").filter(Boolean);
  const image = `${siteOrigin()}/og?locale=${locale}${parts.length === 2 && ["notes", "work"].includes(parts[0]) ? `&kind=${parts[0]}&slug=${parts[1]}` : ""}`;
  return {
    openGraph: {
      title,
      description,
      url: siteOrigin() + localizedPath(locale, path),
      siteName: "codematt",
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? ["en_US"] : ["id_ID"],
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
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
