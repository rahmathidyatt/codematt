"use client";
import { useState } from "react";
import { NoteCard } from "./note-card";
import type { NoteSummary } from "@/lib/content/note-schema";
import type { Locale } from "@/lib/i18n";
import { notesMessages } from "@/config/notes-messages";
export function NotesExplorer({
  notes,
  locale,
}: {
  notes: NoteSummary[];
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const t = notesMessages[locale];
  const filtered = notes.filter(
    (n) =>
      (!tag || n.tags.includes(tag)) &&
      `${n.title} ${n.summary} ${n.tags.join(" ")}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );
  return (
    <section className="notes-explorer">
      <div className="note-filters">
        <label>
          {t.search}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          {t.topic}
          <select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="">{t.all}</option>
            {[...new Set(notes.flatMap((n) => n.tags))].sort().map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </select>
        </label>
        <button
          className="button"
          onClick={() => {
            setQuery("");
            setTag("");
          }}
        >
          {t.reset}
        </button>
      </div>
      <p role="status" className="sr-only">
        {filtered.length} {locale === "id" ? "catatan" : "notes"}
      </p>
      <div className="notes-grid">
        {filtered.map((note) => (
          <NoteCard key={note.slug} note={note} locale={locale} />
        ))}
      </div>
      {!filtered.length && <p className="empty-state">{t.empty}</p>}
    </section>
  );
}
