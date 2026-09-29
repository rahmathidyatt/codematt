import Link from "next/link";

import { site } from "@/config/site";
import { dictionaries } from "@/config/messages";
import { localizedPath, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = dictionaries[locale] ?? dictionaries.id;

  return (
    <footer className="site-footer container">
      <div>
        <Link
          className="wordmark"
          href={localizedPath(locale)}
          aria-label={`codematt — ${t.home}`}
        >
          codematt<span aria-hidden="true">.</span>
        </Link>

        <p>{t.footer}</p>
      </div>

      <p>
        © {new Date().getFullYear()} {site.owner}
        <br />
        <span className="muted">
          {t.footerEnd}
        </span>
      </p>
    </footer>
  );
}