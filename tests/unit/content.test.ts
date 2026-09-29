import { describe, it, expect } from "vitest";
import { readFile } from "node:fs/promises";
import { projectSchema } from "../../lib/content/schema";
import { parseProject } from "../../lib/content/parser";
import {
  assertUniqueSlugs,
  publishedProjects,
  readProjects,
} from "../../lib/content/repository";
const valid = {
  title: "Test",
  slug: "test",
  summary: "A useful tool",
  date: "2026-09-29",
  year: 2026,
  category: "web-apps",
  stack: ["TypeScript"],
  status: "published",
};
describe("project contract", () => {
  it("accepts minimal metadata with defaults", () =>
    expect(projectSchema.parse(valid).gallery).toEqual([]));
  it.each([
    { date: "2026-02-30" },
    { year: 2025 },
    { category: "invalid" },
    { slug: "../secret" },
    { github: "javascript:alert(1)" },
    {
      cover: {
        src: "/projects/test/../x.webp",
        alt: "X",
        width: 10,
        height: 10,
      },
    },
    { surprise: true },
  ])("rejects malformed metadata %j", (override) =>
    expect(projectSchema.safeParse({ ...valid, ...override }).success).toBe(
      false,
    ),
  );
  it("reports file and field on invalid metadata", async () => {
    await expect(
      parseProject("---\ntitle: Test\n---\nBody", "test.mdx"),
    ).rejects.toThrow(/Invalid project test.mdx:.*slug/);
  });
  it("checks real content, draft visibility and duplicate slugs", async () => {
    const docs = await readProjects();
    expect(docs.some((p) => p.meta.slug === "code-reader")).toBe(true);
    expect(() => assertUniqueSlugs([...docs, ...docs])).toThrow("Duplicate");
    expect(
      publishedProjects([
        { ...docs[0], meta: { ...docs[0].meta, status: "draft" } },
      ]),
    ).toHaveLength(0);
  });
  it("rejects mismatched filenames and malformed MDX", async () => {
    const source = await readFile(
      "content/projects/id/code-reader.mdx",
      "utf8",
    );
    await expect(parseProject(source, "other.mdx")).rejects.toThrow(
      "filename must match slug",
    );
    await expect(
      parseProject(source + "\n<Unclosed", "code-reader.mdx"),
    ).rejects.toThrow("Invalid project code-reader.mdx");
  });
});
