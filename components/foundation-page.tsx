import Link from "next/link";
import { dictionaries } from "@/config/messages";
import { localizedPath, type Locale } from "@/lib/i18n";
export function FoundationPage({
  eyebrow,
  title,
  description,
  children,
  locale,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  locale: Locale;
}) {
  return (
    <div className="container page">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      <p className="page-lead">{description}</p>
      {children}
      <div className="page-bottom">
        <Link className="text-link" href={localizedPath(locale, "/work")}>
          {dictionaries[locale].exploreWork}
        </Link>
      </div>
    </div>
  );
}
