"use client";
import { usePathname } from "next/navigation";
import { dictionaries } from "@/config/messages";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const locale = usePathname()?.split("/")[1] === "en" ? "en" : "id";
  const t = dictionaries[locale];
  return (
    <div className="container page">
      <h1 className="page-title">{t.errorTitle}</h1>
      <p className="page-lead">{t.errorText}</p>
      <button className="button primary" onClick={reset}>
        {t.retry}
      </button>
    </div>
  );
}
