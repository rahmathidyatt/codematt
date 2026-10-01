"use client";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { notesMessages } from "@/config/notes-messages";
export function ReadingProgress({ locale }: { locale: Locale }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const article = document.getElementById("note-content");
    if (!article) return;
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!article) return;
        const rect = article.getBoundingClientRect();
        const distance = rect.height - innerHeight;
        setValue(
          Math.round(
            Math.max(
              0,
              Math.min(
                1,
                distance > 0
                  ? -rect.top / distance
                  : rect.bottom <= innerHeight
                    ? 1
                    : 0,
              ),
            ) * 100,
          ),
        );
      });
    }
    const observer = new ResizeObserver(update);
    observer.observe(article);
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
    return () => {
      observer.disconnect();
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-label={notesMessages[locale].progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <span style={{ transform: `scaleX(${value / 100})` }} />
    </div>
  );
}
