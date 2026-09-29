import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import { projectSchema, type ProjectDocument } from "./schema";
export async function parseProject(
  source: string,
  filename: string,
): Promise<ProjectDocument> {
  try {
    const parsed = matter(source);
    const result = projectSchema.safeParse(parsed.data);
    if (!result.success)
      throw new Error(
        result.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; "),
      );
    if (filename !== `${result.data.slug}.mdx`)
      throw new Error("filename must match slug");
    await compile(parsed.content);
    return { meta: result.data, body: parsed.content };
  } catch (error) {
    throw new Error(
      `Invalid project ${filename}: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
}
