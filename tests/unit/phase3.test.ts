import { describe, it, expect } from "vitest";
import {
  searchEntries,
  buildSearchIndex,
  type SearchEntry,
} from "../../lib/search";
import { readCatalog, selectLocale } from "../../lib/content/repository";
import { experienceMessages } from "../../config/experience-messages";
const entries: SearchEntry[] = [
  {
    title: "Python overview",
    href: "/id/notes/python",
    keywords: "data",
    kind: "pages",
    lang: "id",
  },
  {
    title: "Data Lab",
    href: "/id/work/data-lab",
    keywords: "Python analisis data",
    kind: "projects",
    lang: "id",
  },
];
describe("command search", () => {
  it("matches all tokens across title and technology", () =>
    expect(searchEntries(entries, "LAB python").map((e) => e.title)).toEqual([
      "Data Lab",
    ]));
  it("normalizes punctuation, spacing and accents", () =>
    expect(searchEntries(entries, " dáta---lab ")[0].title).toBe("Data Lab"));
  it("ranks exact titles first without mutating the index", () => {
    const input = [...entries].reverse();
    expect(searchEntries(input, "Python")[0].title).toBe("Python overview");
    expect(input[0].title).toBe("Data Lab");
  });
  it("handles no results and blank queries", () => {
    expect(searchEntries(entries, "zzzx")).toEqual([]);
    expect(searchEntries(entries, "   ")).toEqual(entries);
  });
  it("indexes localized public content and navigation only", async () => {
    const catalog = await readCatalog();
    for (const locale of ["id", "en"] as const) {
      const projects = selectLocale(catalog, locale)
        .filter((p) => p.meta.status !== "draft")
        .map((p) => ({ ...p.meta, contentLocale: p.contentLocale }));
      const index = buildSearchIndex(projects, locale);
      expect(index.every((e) => e.href.startsWith(`/${locale}`))).toBe(true);
      expect(index.filter((e) => e.kind === "projects")).toHaveLength(
        projects.length,
      );
      expect(index.find((e) => e.href.endsWith("/notes"))?.kind).toBe("pages");
    }
  });
  it("has matching translation keys", () =>
    expect(Object.keys(experienceMessages.id).sort()).toEqual(
      Object.keys(experienceMessages.en).sort(),
    ));
});
