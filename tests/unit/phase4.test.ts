import { describe, it, expect, afterEach } from "vitest";
import {
  parseNote,
  selectNotes,
  validateNoteTranslations,
  readNotes,
} from "../../lib/content/notes";
import { readingMinutes } from "../../lib/content/note-headings";
import { buildSearchIndex } from "../../lib/search";
import { siteOrigin, canIndex, jsonLd } from "../../lib/site-url";
const source = (
  status = "published",
  body = "## Hello\n\nText\n\n## Hello\n\n### Hello-2",
) =>
  `---\ntitle: Note\nslug: note\nsummary: A summary\ndate: "2026-09-30"\nstatus: ${status}\n---\n\n${body}`;
describe("Notes content contract", () => {
  it("creates collision-free heading anchors including inline code", async () => {
    const note = await parseNote(
      source(
        "published",
        "## Hello\n\n## Hello\n\n### Hello-2\n\n## Use `code`",
      ),
      "note.mdx",
      "id",
    );
    expect(note.headings.map((h) => h.id)).toEqual([
      "note-hello",
      "note-hello-2",
      "note-hello-2-2",
      "note-use-code",
    ]);
  });
  it("ignores code blocks when collecting headings", async () => {
    const n = await parseNote(
      source("published", "```md\n## Hidden\n```\n\n## Visible"),
      "note.mdx",
      "id",
    );
    expect(n.headings.map((h) => h.text)).toEqual(["Visible"]);
  });
  it("rejects bad filenames, metadata and broken MDX", async () => {
    await expect(parseNote(source(), "wrong.mdx", "id")).rejects.toThrow(
      "filename",
    );
    await expect(
      parseNote(source().replace("2026-09-30", "2026-02-30"), "note.mdx", "id"),
    ).rejects.toThrow();
    await expect(
      parseNote(source("published", "<Missing"), "note.mdx", "id"),
    ).rejects.toThrow();
  });
  it("excludes drafts and uses explicit Indonesian fallback", async () => {
    const n = await parseNote(source(), "note.mdx", "id");
    expect(selectNotes({ id: [n], en: [] }, "en")[0].contentLocale).toBe("id");
    expect(
      selectNotes(
        { id: [{ ...n, meta: { ...n.meta, status: "draft" } }], en: [] },
        "id",
      ),
    ).toEqual([]);
  });
  it("rejects duplicate and mismatched translations", async () => {
    const n = await parseNote(source(), "note.mdx", "id");
    expect(() => validateNoteTranslations({ id: [n, n], en: [] })).toThrow(
      "Duplicate",
    );
    expect(() => validateNoteTranslations({ id: [], en: [n] })).toThrow(
      "Missing",
    );
    expect(() =>
      validateNoteTranslations({
        id: [n],
        en: [{ ...n, meta: { ...n.meta, status: "draft" } }],
      }),
    ).toThrow("mismatch");
  });
  it("rejects an updated date before publication", async () => {
    await expect(
      parseNote(
        source().replace(
          "status: published",
          'updated: "2026-09-01"\nstatus: published',
        ),
        "note.mdx",
        "id",
      ),
    ).rejects.toThrow("updated");
  });
  it("estimates reading time with a one-minute minimum", () => {
    expect(readingMinutes("")).toBe(1);
    expect(readingMinutes("word ".repeat(401))).toBe(3);
  });
  it("indexes only published notes in the requested locale", async () => {
    const catalog = await readNotes();
    for (const locale of ["id", "en"] as const) {
      const notes = selectNotes(catalog, locale).map((n) => ({
        ...n.meta,
        contentLocale: n.contentLocale,
        readingMinutes: n.readingMinutes,
      }));
      const result = buildSearchIndex([], locale, notes);
      expect(result.filter((r) => r.kind === "notes")).toHaveLength(2);
      expect(result.every((r) => r.href.startsWith(`/${locale}`))).toBe(true);
    }
  });
});
const old = { ...process.env };
afterEach(() => {
  process.env = { ...old };
});
describe("SEO safety", () => {
  it("uses canonical origins and blocks preview indexing", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    process.env.VERCEL_ENV = "production";
    expect(siteOrigin()).toBe("https://example.com");
    expect(canIndex()).toBe(true);
    process.env.VERCEL_ENV = "preview";
    expect(canIndex()).toBe(false);
  });
  it("blocks local indexing and rejects non-HTTP origins", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    expect(canIndex()).toBe(false);
    process.env.NEXT_PUBLIC_SITE_URL = "javascript:bad";
    expect(() => siteOrigin()).toThrow();
  });
  it("escapes script markup in structured data while preserving JSON", () => {
    const data = { name: "</script><script>alert(1)</script>" };
    expect(jsonLd(data)).not.toContain("<");
    expect(JSON.parse(jsonLd(data))).toEqual(data);
  });
});
