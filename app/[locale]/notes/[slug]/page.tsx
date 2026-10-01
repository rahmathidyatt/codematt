import Link from "next/link";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getNotes, getNote } from "@/lib/content/notes.server";
import { getLocale } from "@/lib/locale.server";
import { isLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { headingPlugin } from "@/lib/content/note-headings";
import { notesMessages } from "@/config/notes-messages";
import { ReadingProgress } from "@/components/reading-progress";
import { JsonLd } from "@/components/json-ld";
import { siteOrigin } from "@/lib/site-url";
import { site } from "@/config/site";
type Params = Promise<{ locale: string; slug: string }>;
export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  return isLocale(params.locale)
    ? (await getNotes(params.locale)).map((n) => ({ slug: n.slug }))
    : [];
}
export async function generateMetadata({ params }: { params: Params }) {
  const locale = await getLocale(params);
  const note = await getNote((await params).slug, locale);
  if (!note) return { title: "Not found", robots: { index: false } };
  const base = pageMetadata(
    locale,
    note.meta.title,
    note.meta.summary,
    `/notes/${note.meta.slug}`,
  );
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: note.meta.date,
      modifiedTime: note.meta.updated ?? note.meta.date,
      authors: [site.owner],
    },
  };
}
export default async function NotePage({ params }: { params: Params }) {
  const locale = await getLocale(params);
  const note = await getNote((await params).slug, locale);
  if (!note) notFound();
  const t = notesMessages[locale];
  const { meta, contentLocale } = note;
  const { default: Content } = await evaluate(note.body, {
    ...runtime,
    remarkPlugins: [headingPlugin()],
  });
  const notes = await getNotes(locale);
  const index = notes.findIndex((n) => n.slug === meta.slug);
  const previous = notes[index - 1];
  const next = notes[index + 1];
  const url = `${siteOrigin()}${localizedPath(locale, `/notes/${meta.slug}`)}`;
  return (
    <article className="container page note-page">
      <ReadingProgress key={meta.slug} locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: meta.title,
          description: meta.summary,
          datePublished: meta.date,
          dateModified: meta.updated ?? meta.date,
          inLanguage: contentLocale,
          author: { "@type": "Person", name: site.owner },
          mainEntityOfPage: url,
          url,
          image: `${siteOrigin()}/og?locale=${locale}&kind=notes&slug=${meta.slug}`,
        }}
      />
      <Link className="text-link" href={localizedPath(locale, "/notes")}>
        {t.back}
      </Link>
      <p className="eyebrow case-label">
        <time dateTime={meta.date}>{meta.date}</time> · {note.readingMinutes}{" "}
        {t.minutes}
      </p>
      <h1 className="page-title" lang={contentLocale}>
        {meta.title}
      </h1>
      <p className="page-lead" lang={contentLocale}>
        {meta.summary}
      </p>
      {meta.updated && (
        <p className="muted">
          {t.updated}: <time dateTime={meta.updated}>{meta.updated}</time>
        </p>
      )}
      {locale !== contentLocale && (
        <p className="translation-note">{t.fallback}</p>
      )}
      <div className="note-layout">
        <aside className="note-toc">
          {note.headings.length > 0 && (
            <nav aria-label={t.toc}>
              <h2>{t.toc}</h2>
              <ul>
                {note.headings.map((h) => (
                  <li key={h.id} data-depth={h.depth}>
                    <a href={`#${h.id}`} lang={contentLocale}>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
        <div
          className="prose note-content"
          id="note-content"
          lang={contentLocale}
        >
          <Content />
        </div>
      </div>
      <nav
        className="note-pagination"
        aria-label={locale === "id" ? "Navigasi catatan" : "Note navigation"}
      >
        {previous ? (
          <Link href={localizedPath(locale, `/notes/${previous.slug}`)}>
            <small>{t.previous}</small>
            <span lang={previous.contentLocale}>{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={localizedPath(locale, `/notes/${next.slug}`)}>
            <small>{t.next}</small>
            <span lang={next.contentLocale}>{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
