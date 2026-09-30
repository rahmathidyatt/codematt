"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { experienceMessages } from "@/config/experience-messages";
import { searchEntries, type SearchEntry } from "@/lib/search";
import type { Locale } from "@/lib/i18n";
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
export function CommandPalette({
  entries,
  locale,
}: {
  entries: SearchEntry[];
  locale: Locale;
}) {
  const t = experienceMessages[locale];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const results = searchEntries(entries, query);
  function changeOpen(value: boolean) {
    setOpen(value);
    if (value) {
      setQuery("");
      setActive(0);
    }
  }
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k" &&
        !event.isComposing &&
        !event.altKey
      ) {
        // Avoid stacking a command dialog over the mobile menu or image viewer.
        if (!open && document.querySelector('[role="dialog"]')) return;
        event.preventDefault();
        setOpen((value) => !value);
        setQuery("");
        setActive(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);
  useEffect(() => {
    if (open)
      document
        .getElementById(`${id}-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [active, open, id]);
  function visit(entry: SearchEntry) {
    changeOpen(false);
    router.push(entry.href);
  }
  return (
    <DialogRoot open={open} onOpenChange={changeOpen}>
      <DialogTrigger
        className="search-trigger"
        aria-label={t.search}
        title={`${t.search} (Ctrl/Cmd+K)`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
        <kbd>⌘ K</kbd>
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop className="dialog-backdrop" />
        <DialogPopup className="command-dialog" initialFocus={input}>
          <div className="dialog-heading">
            <DialogTitle>{t.search}</DialogTitle>
            <DialogClose className="button small">{t.close}</DialogClose>
          </div>
          <input
            ref={input}
            role="combobox"
            aria-label={t.search}
            aria-expanded={open}
            aria-controls={`${id}-results`}
            aria-autocomplete="list"
            aria-activedescendant={
              results[active] ? `${id}-${active}` : undefined
            }
            autoComplete="off"
            placeholder={t.placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                if (results.length)
                  setActive(
                    (value) =>
                      (value +
                        (e.key === "ArrowDown" ? 1 : -1) +
                        results.length) %
                      results.length,
                  );
              }
              if (e.key === "Enter" && results[active]) {
                e.preventDefault();
                visit(results[active]);
              }
            }}
          />
          <p className="sr-only" role="status">
            {results.length} {t.results}
          </p>
          <div
            id={`${id}-results`}
            role="listbox"
            aria-label={t.search}
            className="command-results"
          >
            {results.map((entry, index) => (
              <div
                key={entry.href}
                id={`${id}-${index}`}
                role="option"
                aria-selected={active === index}
                className="command-result"
                onPointerMove={() => setActive(index)}
                onClick={() => visit(entry)}
              >
                <span lang={entry.lang}>{entry.title}</span>
                <small>{t[entry.kind]}</small>
              </div>
            ))}
          </div>
          {!results.length && <p className="command-empty">{t.empty}</p>}
          <p className="command-hint">{t.hint}</p>
        </DialogPopup>
      </DialogPortal>
    </DialogRoot>
  );
}
