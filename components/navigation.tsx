"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = navigation.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={
        (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
          ? "page"
          : undefined
      }
      onClick={() => setOpen(false)}
    >
      {item.label}
    </Link>
  ));
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="wordmark" aria-label="codematt home">
          code<span>matt</span>
          <i aria-hidden="true">.</i>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <DialogRoot open={open} onOpenChange={setOpen}>
            <DialogTrigger className="menu-trigger">
              Menu <span aria-hidden="true">≡</span>
            </DialogTrigger>
            <DialogPortal>
              <DialogBackdrop className="dialog-backdrop" />
              <DialogPopup className="mobile-dialog">
                <div className="dialog-heading">
                  <DialogTitle>Explore codematt</DialogTitle>
                  <DialogClose className="button small">Close</DialogClose>
                </div>
                <nav aria-label="Mobile navigation">{links}</nav>
              </DialogPopup>
            </DialogPortal>
          </DialogRoot>
        </div>
      </div>
    </header>
  );
}
