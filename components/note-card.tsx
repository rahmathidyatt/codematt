import Link from "next/link";
import type { NoteSummary } from "@/lib/content/note-schema";
import { localizedPath, type Locale } from "@/lib/i18n";
import { notesMessages } from "@/config/notes-messages";
export function NoteCard({
  note,
  locale,
}: {
  note: NoteSummary;
  locale: Locale;
}) {
  const t = notesMessages[locale];
  return (
    <article className="note-card" data-note={note.slug}>
      <p className="eyebrow">
        <time dateTime={note.date}>{note.date}</time> · {note.readingMinutes}{" "}
        {t.minutes}
      </p>
      <h2 lang={note.contentLocale}>
        <Link href={localizedPath(locale, `/notes/${note.slug}`)}>
          {note.title}
        </Link>
      </h2>
      <p lang={note.contentLocale}>{note.summary}</p>
      <ul className="tags" lang={note.contentLocale}>
        {note.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {note.contentLocale !== locale && (
        <p className="translation-note">{t.fallback}</p>
      )}
      <Link
        className="text-link"
        href={localizedPath(locale, `/notes/${note.slug}`)}
      >
        {t.read} <span aria-hidden="true">↗</span>
        <span className="sr-only">: {note.title}</span>
      </Link>
    </article>
  );
}
