"use client";
import { useSyncExternalStore } from "react";
import { Analytics } from "@vercel/analytics/react";
import { notesMessages } from "@/config/notes-messages";
import type { Locale } from "@/lib/i18n";
const key = "codematt-analytics";
function allowed() {
  try {
    return localStorage.getItem(key) === "yes";
  } catch {
    return false;
  }
}
function subscribe(callback: () => void) {
  addEventListener("storage", callback);
  return () => removeEventListener("storage", callback);
}
export function AnalyticsConsent({ locale }: { locale: Locale }) {
  const consent = useSyncExternalStore(subscribe, allowed, () => false);
  const t = notesMessages[locale];
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "true") return null;
  function toggle() {
    try {
      localStorage.setItem(key, consent ? "no" : "yes");
      location.reload();
    } catch {
      /* Leave analytics disabled when storage is unavailable. */
    }
  }
  return (
    <div className="analytics-consent">
      <p>{t.privacy}</p>
      <button className="button small" onClick={toggle}>
        {consent ? t.disable : t.allow}
      </button>
      <span className="sr-only" role="status">
        {consent ? t.enabled : t.disabled}
      </span>
      {consent && (
        <Analytics
          beforeSend={(event) => {
            if (!allowed() || navigator.doNotTrack === "1") return null;
            const url = new URL(event.url);
            url.search = "";
            url.hash = "";
            return { ...event, url: url.toString() };
          }}
        />
      )}
    </div>
  );
}
