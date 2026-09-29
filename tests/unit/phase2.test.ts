import { describe, it, expect } from "vitest";
import {
  readCatalog,
  selectLocale,
  validateTranslations,
} from "../../lib/content/repository";
import {
  filterProjects,
  readFilters,
  filtersToQuery,
} from "../../lib/content/explorer";
import { switchLocalePath } from "../../lib/i18n";
import { dictionaries } from "../../config/messages";
import type { ProjectMeta, ProjectDocument } from "../../lib/content/schema";
const base = {
  title: "Tool",
  slug: "tool",
  summary: "Useful",
  date: "2026-09-29",
  year: 2026,
  category: "web-apps",
  stack: ["Python"],
  tags: [],
  status: "published",
  featured: false,
  order: 100,
  gallery: [],
  repositoryVisibility: "unlisted",
} satisfies ProjectMeta;
const fixtures: ProjectMeta[] = [
  {
    ...base,
    slug: "old",
    title: "Older featured",
    date: "2025-01-02",
    year: 2025,
    featured: true,
  },
  { ...base, slug: "new", title: "Newest" },
  {
    ...base,
    slug: "analysis",
    title: "Analisis café",
    summary: "Data exploration",
    category: "data-analysis",
    stack: ["Pandas"],
    tags: ["CSV"],
    order: 1,
  },
];
describe("explorer", () => {
  it("combines case-insensitive terms, category, technology and year", () => {
    const f = readFilters(
      new URLSearchParams(
        "q=ANALISIS+cafe&category=data-analysis&stack=Pandas&year=2026",
      ),
    );
    expect(filterProjects(fixtures, f).map((p) => p.slug)).toEqual([
      "analysis",
    ]);
  });
  it("matches tags and returns honest empty results", () => {
    expect(
      filterProjects(fixtures, readFilters(new URLSearchParams("q=csv"))),
    ).toHaveLength(1);
    expect(
      filterProjects(
        fixtures,
        readFilters(new URLSearchParams("stack=unknown")),
      ),
    ).toHaveLength(0);
  });
  it("sorts newest, featured and year without mutating input", () => {
    expect(
      filterProjects(fixtures, readFilters(new URLSearchParams()))[0].slug,
    ).toBe("analysis");
    expect(
      filterProjects(
        fixtures,
        readFilters(new URLSearchParams("sort=featured")),
      )[0].slug,
    ).toBe("old");
    expect(
      filterProjects(fixtures, readFilters(new URLSearchParams("sort=year")))[0]
        .year,
    ).toBe(2026);
    expect(fixtures[0].slug).toBe("old");
  });
  it("normalizes invalid query and produces a shareable query", () => {
    const filters = readFilters(
      new URLSearchParams("category=bad&year=no&sort=random&q=+hello+"),
    );
    expect(filters.category).toBe("");
    expect(filters.sort).toBe("newest");
    expect(filtersToQuery(filters)).toBe("q=hello");
  });
});
describe("bilingual content", () => {
  it("validates all MDX documents and identical public slugs", async () => {
    const catalog = await readCatalog();
    expect(catalog.id.length).toBeGreaterThan(0);
    expect(
      catalog.en.every((p) =>
        catalog.id.some((source) => source.meta.slug === p.meta.slug),
      ),
    ).toBe(true);
    expect(selectLocale(catalog, "id").map((p) => p.meta.slug)).toEqual(
      selectLocale(catalog, "en").map((p) => p.meta.slug),
    );
    expect(catalog.en.every((p) => p.contentLocale === "en")).toBe(true);
  });
  it("falls back to Indonesian when English is not available", () => {
    const source: ProjectDocument = {
      meta: base,
      body: "## Ringkasan",
      contentLocale: "id",
    };
    const docs = selectLocale({ id: [source], en: [] }, "en");
    expect(docs[0].contentLocale).toBe("id");
    expect(docs[0].body).toContain("Ringkasan");
  });
  it("does not publish drafts in either language", () => {
    const source: ProjectDocument = {
      meta: { ...base, status: "draft" },
      body: "Private draft",
      contentLocale: "id",
    };
    expect(selectLocale({ id: [source], en: [] }, "en")).toHaveLength(0);
  });
  it("rejects orphan translations and mismatched shared metadata", () => {
    const source: ProjectDocument = {
      meta: base,
      body: "Text",
      contentLocale: "id",
    };
    expect(() => validateTranslations({ id: [], en: [source] })).toThrow(
      "Missing Indonesian",
    );
    expect(() =>
      validateTranslations({
        id: [source],
        en: [{ ...source, meta: { ...base, featured: true } }],
      }),
    ).toThrow("featured");
  });
  it("keeps project path when switching language and all UI keys translated", () => {
    expect(switchLocalePath("/id/work/code-reader", "en")).toBe(
      "/en/work/code-reader",
    );
    expect(switchLocalePath("/en", "id")).toBe("/id");
    expect(Object.keys(dictionaries.id).sort()).toEqual(
      Object.keys(dictionaries.en).sort(),
    );
  });
});
