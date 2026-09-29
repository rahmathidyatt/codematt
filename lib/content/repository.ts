import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";
import { parseProject } from "./parser";
import type { ProjectDocument } from "./schema";
export function assertUniqueSlugs(documents: ProjectDocument[]) {
  const slugs = new Set<string>();
  for (const { meta } of documents) {
    if (slugs.has(meta.slug))
      throw new Error(`Duplicate project slug: ${meta.slug}`);
    slugs.add(meta.slug);
  }
}
export async function readProjects(
  root = process.cwd(),
): Promise<ProjectDocument[]> {
  const directory = path.join(root, "content/projects");
  const filenames = (await readdir(directory))
    .filter((name) => name.endsWith(".mdx"))
    .sort();
  const documents = await Promise.all(
    filenames.map(async (name) =>
      parseProject(await readFile(path.join(directory, name), "utf8"), name),
    ),
  );
  assertUniqueSlugs(documents);
  for (const { meta } of documents)
    for (const asset of [meta.cover, ...meta.gallery])
      if (asset) {
        try {
          await access(path.join(root, "public", asset.src));
        } catch {
          throw new Error(`Missing asset for ${meta.slug}: ${asset.src}`);
        }
      }
  return documents.sort(
    (a, b) =>
      a.meta.order - b.meta.order ||
      b.meta.date.localeCompare(a.meta.date) ||
      a.meta.slug.localeCompare(b.meta.slug),
  );
}
export const publishedProjects = (documents: ProjectDocument[]) =>
  documents.filter(({ meta }) => meta.status !== "draft");
