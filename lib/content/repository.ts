import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";
import { parseProject } from "./parser";
import type { ProjectDocument } from "./schema";
import { locales, type Locale } from "../i18n";
export function assertUniqueSlugs(documents: ProjectDocument[]) {
  const slugs = new Set<string>();
  for (const { meta } of documents) {
    if (slugs.has(meta.slug))
      throw new Error(`Duplicate project slug: ${meta.slug}`);
    slugs.add(meta.slug);
  }
}
export function validateTranslations(
  catalog: Record<Locale, ProjectDocument[]>,
) {
  for (const translated of catalog.en) {
    const original = catalog.id.find(
      (p) => p.meta.slug === translated.meta.slug,
    );
    if (!original)
      throw new Error(`Missing Indonesian source: ${translated.meta.slug}`);
    for (const field of [
      "date",
      "year",
      "category",
      "stack",
      "status",
      "featured",
      "order",
      "repositoryVisibility",
      "github",
      "demo",
      "notebook",
      "article",
    ] as const) {
      if (
        JSON.stringify(original.meta[field]) !==
        JSON.stringify(translated.meta[field])
      )
        throw new Error(
          `Translation mismatch ${translated.meta.slug}: ${field}`,
        );
    }
  }
}
export async function readCatalog(
  root = process.cwd(),
): Promise<Record<Locale, ProjectDocument[]>> {
  const catalog = { id: [], en: [] } as Record<Locale, ProjectDocument[]>;
  for (const locale of locales) {
    const directory = path.join(root, "content/projects", locale);
    const names = (await readdir(directory))
      .filter((n) => n.endsWith(".mdx"))
      .sort();
    catalog[locale] = await Promise.all(
      names.map(async (name) =>
        parseProject(
          await readFile(path.join(directory, name), "utf8"),
          name,
          locale,
        ),
      ),
    );
    assertUniqueSlugs(catalog[locale]);
    for (const { meta } of catalog[locale])
      for (const asset of [meta.cover, ...meta.gallery])
        if (asset) {
          try {
            await access(path.join(root, "public", asset.src));
          } catch {
            throw new Error(
              `Missing asset for ${locale}/${meta.slug}: ${asset.src}`,
            );
          }
        }
  }
  validateTranslations(catalog);
  return catalog;
}
export const publishedProjects = (documents: ProjectDocument[]) =>
  documents.filter(({ meta }) => meta.status !== "draft");
export function selectLocale(
  catalog: Record<Locale, ProjectDocument[]>,
  locale: Locale,
) {
  return publishedProjects(catalog.id)
    .map((source) =>
      locale === "id"
        ? source
        : (catalog.en.find((p) => p.meta.slug === source.meta.slug) ?? source),
    )
    .sort(
      (a, b) =>
        a.meta.order - b.meta.order ||
        b.meta.date.localeCompare(a.meta.date) ||
        a.meta.slug.localeCompare(b.meta.slug),
    );
}
export async function readProjects(
  root = process.cwd(),
  locale: Locale = "id",
) {
  return selectLocale(await readCatalog(root), locale);
}
