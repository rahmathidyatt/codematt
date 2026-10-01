import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import { noteSchema, type NoteDocument, type Heading } from "./note-schema";
import { headingPlugin, readingMinutes } from "./note-headings";
import { locales, type Locale } from "../i18n";
export async function parseNote(
  source: string,
  filename: string,
  locale: Locale,
): Promise<NoteDocument> {
  try {
    const parsed = matter(source);
    const meta = noteSchema.parse(parsed.data);
    if (filename !== `${meta.slug}.mdx`)
      throw new Error("filename must match slug");
    const headings: Heading[] = [];
    await compile(parsed.content, { remarkPlugins: [headingPlugin(headings)] });
    return {
      meta,
      body: parsed.content,
      contentLocale: locale,
      headings,
      readingMinutes: readingMinutes(parsed.content),
    };
  } catch (error) {
    throw new Error(
      `Invalid note ${locale}/${filename}: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
}
export type NoteCatalog = Record<Locale, NoteDocument[]>;
export function validateNoteTranslations(catalog: NoteCatalog) {
  for (const locale of locales) {
    const seen = new Set<string>();
    for (const note of catalog[locale]) {
      if (seen.has(note.meta.slug))
        throw new Error(`Duplicate note: ${note.meta.slug}`);
      seen.add(note.meta.slug);
    }
  }
  for (const translated of catalog.en) {
    const original = catalog.id.find(
      (n) => n.meta.slug === translated.meta.slug,
    );
    if (!original)
      throw new Error(`Missing Indonesian note: ${translated.meta.slug}`);
    for (const field of ["status", "date", "updated"] as const)
      if (original.meta[field] !== translated.meta[field])
        throw new Error(
          `Translation mismatch ${translated.meta.slug}: ${field}`,
        );
  }
}
export async function readNotes(root = process.cwd()): Promise<NoteCatalog> {
  const catalog: NoteCatalog = { id: [], en: [] };
  for (const locale of locales) {
    const dir = path.join(root, "content/notes", locale);
    let names: string[];
    try {
      names = await readdir(dir);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw e;
    }
    catalog[locale] = await Promise.all(
      names
        .filter((n) => n.endsWith(".mdx"))
        .sort()
        .map(async (name) =>
          parseNote(await readFile(path.join(dir, name), "utf8"), name, locale),
        ),
    );
  }
  validateNoteTranslations(catalog);
  return catalog;
}
export function selectNotes(catalog: NoteCatalog, locale: Locale) {
  return catalog.id
    .filter((n) => n.meta.status === "published")
    .map((n) =>
      locale === "en"
        ? (catalog.en.find((t) => t.meta.slug === n.meta.slug) ?? n)
        : n,
    )
    .sort(
      (a, b) =>
        b.meta.date.localeCompare(a.meta.date) ||
        a.meta.slug.localeCompare(b.meta.slug),
    );
}
