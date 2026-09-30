import { navigation } from "@/config/site";
import { dictionaries, categoryLabels } from "@/config/messages";
import { localizedPath, type Locale } from "@/lib/i18n";
import type { LocalizedProjectMeta } from "@/lib/content/schema";
export type SearchEntry = {
  title: string;
  href: string;
  keywords: string;
  kind: "pages" | "projects";
  lang: Locale;
};
export function buildSearchIndex(
  projects: LocalizedProjectMeta[],
  locale: Locale,
): SearchEntry[] {
  const t = dictionaries[locale];
  return [
    ...navigation.map((item) => ({
      title:
        t[
          item.label.toLowerCase() as
            "home" | "work" | "lab" | "about" | "notes" | "contact"
        ],
      href: localizedPath(locale, item.href),
      keywords: item.label,
      kind: "pages" as const,
      lang: locale,
    })),
    ...projects
      .filter((p) => p.status !== "draft")
      .map((p) => ({
        title: p.title,
        href: localizedPath(locale, `/work/${p.slug}`),
        keywords: [
          p.summary,
          categoryLabels[locale][p.category],
          ...p.stack,
          ...p.tags,
        ].join(" "),
        kind: "projects" as const,
        lang: p.contentLocale,
      })),
  ];
}
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
export function searchEntries(
  entries: SearchEntry[],
  query: string,
): SearchEntry[] {
  const q = normalize(query);
  if (!q) return entries;
  const tokens = q.split(/\s+/);
  return entries
    .map((entry, index) => ({
      entry,
      index,
      title: normalize(entry.title),
      text: normalize(`${entry.title} ${entry.keywords}`),
    }))
    .filter((e) => tokens.every((token) => e.text.includes(token)))
    .sort(
      (a, b) =>
        Number(b.title === q) - Number(a.title === q) ||
        Number(b.title.startsWith(q)) - Number(a.title.startsWith(q)) ||
        a.index - b.index,
    )
    .map((e) => e.entry);
}
