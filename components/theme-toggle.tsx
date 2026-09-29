"use client";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import type { Locale } from "@/lib/i18n";
import { dictionaries } from "@/config/messages";
const subscribe = () => () => {};
export function ThemeToggle({ locale }: { locale: Locale }) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  const t = dictionaries[locale];
  return (
    <label className="theme-control">
      <span className="sr-only">{t.theme}</span>
      <select
        aria-label={t.theme}
        value={mounted ? theme : "system"}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="system">{t.system}</option>
        <option value="light">{t.light}</option>
        <option value="dark">{t.dark}</option>
      </select>
    </label>
  );
}
