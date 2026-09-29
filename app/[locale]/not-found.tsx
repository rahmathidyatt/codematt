"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dictionaries } from "@/config/messages";
export default function NotFound() {
  const path = usePathname();
  const locale = path?.split("/")[1] === "en" ? "en" : "id";
  const t = dictionaries[locale];
  return (
    <div className="container page">
      <p className="eyebrow">{t.notFoundLabel}</p>
      <h1 className="page-title">{t.notFoundTitle}</h1>
      <p className="page-lead">{t.notFoundText}</p>
      <Link className="button primary" href={`/${locale}`}>
        {t.backHome}
      </Link>
    </div>
  );
}
