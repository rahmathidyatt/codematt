"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { navigation } from "@/config/site";
import { dictionaries } from "@/config/messages";
import { localizedPath, type Locale } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitch } from "./language-switch";
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { CommandPalette } from "./command-palette";
import type { SearchEntry } from "@/lib/search";
export function Navigation({
  locale,
  entries,
}: {
  locale: Locale;
  entries: SearchEntry[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = dictionaries[locale];
  const links = navigation.map((item) => {
    const href = localizedPath(locale, item.href);
    return (
      <Link
        key={href}
        href={href}
        aria-current={
          (
            item.href === "/"
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`)
          )
            ? "page"
            : undefined
        }
        onClick={() => setOpen(false)}
      >
        {
          t[
            item.label.toLowerCase() as
              "home" | "work" | "lab" | "about" | "notes" | "contact"
          ]
        }
      </Link>
    );
  });
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          className="wordmark"
          href={localizedPath(locale)}
          aria-label={`codematt — ${t.home}`}
        >
          code<span>matt</span>
          <i aria-hidden="true">.</i>
        </Link>
        <nav className="desktop-nav" aria-label={t.mainNav}>
          {links}
        </nav>
        <div className="header-actions">
          <CommandPalette locale={locale} entries={entries} />
          <Suspense
            fallback={
              <span className="language-switch" aria-hidden="true">
                {locale === "id" ? "EN" : "ID"}
              </span>
            }
          >
            <LanguageSwitch locale={locale} />
          </Suspense>
          <ThemeToggle locale={locale} />
          <DialogRoot open={open} onOpenChange={setOpen}>
            <DialogTrigger className="menu-trigger">
              Menu <span aria-hidden="true">≡</span>
            </DialogTrigger>
            <DialogPortal>
              <DialogBackdrop className="dialog-backdrop" />
              <DialogPopup className="mobile-dialog">
                <div className="dialog-heading">
                  <DialogTitle>{t.explore}</DialogTitle>
                  <DialogClose className="button small">{t.close}</DialogClose>
                </div>
                <nav aria-label={t.mobileNav}>{links}</nav>
              </DialogPopup>
            </DialogPortal>
          </DialogRoot>
        </div>
      </div>
    </header>
  );
}
