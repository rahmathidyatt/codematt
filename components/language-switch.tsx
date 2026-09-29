"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { switchLocalePath, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/config/messages";
export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const next = locale === "id" ? "en" : "id";
  const query = params.toString();
  return (
    <Link
      className="language-switch"
      href={`${switchLocalePath(pathname, next)}${query ? `?${query}` : ""}`}
      hrefLang={next}
      lang={next}
      aria-label={
        locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"
      }
      title={dictionaries[locale].language}
      onClick={() => {
        document.cookie = `codematt-locale=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
      }}
    >
      {next === "id" ? "ID" : "EN"}
    </Link>
  );
}
