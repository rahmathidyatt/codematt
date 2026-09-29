import "server-only";
import { cache } from "react";
import { readCatalog, selectLocale } from "./repository";
import type { Locale } from "../i18n";
const catalog = cache(() => readCatalog());
export async function getProjects(locale: Locale = "id") {
  return selectLocale(await catalog(), locale).map((p) => ({
    ...p.meta,
    contentLocale: p.contentLocale,
  }));
}
export async function getProject(slug: string, locale: Locale = "id") {
  return selectLocale(await catalog(), locale).find(
    (p) => p.meta.slug === slug,
  );
}
