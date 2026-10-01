import type { MetadataRoute } from "next";
import { locales, localizedPath } from "@/lib/i18n";
import { getProjects } from "@/lib/content/repository.server";
import { getNotes } from "@/lib/content/notes.server";
import { siteOrigin } from "@/lib/site-url";
import { navigation } from "@/config/site";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = siteOrigin();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    const paths = [
      ...navigation.map((n) => ({
        path: n.href,
        date: undefined as string | undefined,
      })),
      ...(await getProjects(locale)).map((p) => ({
        path: `/work/${p.slug}`,
        date: p.date,
      })),
      ...(await getNotes(locale)).map((n) => ({
        path: `/notes/${n.slug}`,
        date: n.updated ?? n.date,
      })),
    ];
    for (const item of paths)
      entries.push({
        url: origin + localizedPath(locale, item.path),
        ...(item.date ? { lastModified: item.date } : {}),
        alternates: {
          languages: {
            id: origin + localizedPath("id", item.path),
            en: origin + localizedPath("en", item.path),
          },
        },
      });
  }
  return entries;
}
