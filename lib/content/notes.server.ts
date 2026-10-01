import "server-only";
import { cache } from "react";
import { readNotes, selectNotes } from "./notes";
import type { Locale } from "../i18n";
const catalog = cache(() => readNotes());
export async function getNoteDocuments(locale: Locale) {
  return selectNotes(await catalog(), locale);
}
export async function getNotes(locale: Locale) {
  return (await getNoteDocuments(locale)).map((n) => ({
    ...n.meta,
    contentLocale: n.contentLocale,
    readingMinutes: n.readingMinutes,
  }));
}
export async function getNote(slug: string, locale: Locale) {
  return (await getNoteDocuments(locale)).find((n) => n.meta.slug === slug);
}
