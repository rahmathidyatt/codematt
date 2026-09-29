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

export function Navigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Gunakan bahasa Indonesia sebagai fallback
  // supaya aplikasi tidak crash jika locale tidak ditemukan.
  const t = dictionaries[locale] ?? dictionaries.id;

  const links = navigation.map((item) => {
    const href = localizedPath(locale, item.href);

    const key = item.label.toLowerCase() as
      | "home"
      | "work"
      | "lab"
      | "about"
      | "notes"
      | "contact";

    const isActive =
      item.href === "/"
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`);

    return (
      <Link
        key={href}
        href={href}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        {t[key]}
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
          <Suspense
            fallback={
              <span
                className="language-switch"
                aria-hidden="true"
              >
                {locale === "id" ? "EN" : "ID"}
              </span>
            }
          >
            <LanguageSwitch locale={locale} />
          </Suspense>

          <ThemeToggle locale={locale} />

          <DialogRoot
            open={open}
            onOpenChange={setOpen}
          >
            <DialogTrigger className="menu-trigger">
              Menu <span aria-hidden="true">≡</span>
            </DialogTrigger>

            <DialogPortal>
              <DialogBackdrop className="dialog-backdrop" />

              <DialogPopup className="mobile-dialog">
                <div className="dialog-heading">
                  <DialogTitle>
                    {t.explore}
                  </DialogTitle>

                  <DialogClose className="button small">
                    {t.close}
                  </DialogClose>
                </div>

                <nav aria-label={t.mobileNav}>
                  {links}
                </nav>
              </DialogPopup>
            </DialogPortal>
          </DialogRoot>
        </div>
      </div>
    </header>
  );
}