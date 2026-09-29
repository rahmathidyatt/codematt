import { z } from "zod";
export const categories = [
  "web-apps",
  "data-science",
  "data-analysis",
  "machine-learning",
  "automation",
  "legacy-modernization",
  "experiments",
] as const;
export const categoryLabels: Record<(typeof categories)[number], string> = {
  "web-apps": "Web Apps",
  "data-science": "Data Science",
  "data-analysis": "Data Analysis",
  "machine-learning": "Machine Learning",
  automation: "Automation",
  "legacy-modernization": "Legacy Modernization",
  experiments: "Experiments",
};
const webUrl = z
  .url()
  .refine(
    (value) => ["https:", "http:"].includes(new URL(value).protocol),
    "Use an HTTP(S) URL",
  );
const asset = z.object({
  src: z
    .string()
    .regex(
      /^\/projects\/[a-z0-9-]+\/[a-zA-Z0-9_-]+\.(webp|avif|png|jpg|jpeg|svg)$/,
      "Use /projects/<slug>/<filename>.<extension>",
    ),
  alt: z.string().trim().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
export const projectSchema = z
  .object({
    title: z.string().trim().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    summary: z.string().trim().min(1).max(240),
    description: z.string().optional(),
    date: z.iso.date(),
    year: z.number().int().min(2000).max(2100),
    category: z.enum(categories),
    tags: z.array(z.string().min(1)).default([]),
    stack: z.array(z.string().min(1)).min(1),
    status: z.enum([
      "draft",
      "in-progress",
      "prototype",
      "published",
      "archived",
    ]),
    featured: z.boolean().default(false),
    order: z.number().int().default(100),
    cover: asset.optional(),
    gallery: z.array(asset).default([]),
    github: webUrl.optional(),
    demo: webUrl.optional(),
    notebook: webUrl.optional(),
    article: webUrl.optional(),
    role: z.string().optional(),
    duration: z.string().optional(),
    repositoryVisibility: z
      .enum(["public", "private", "unlisted"])
      .default("unlisted"),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.year !== Number(value.date.slice(0, 4)))
      ctx.addIssue({
        code: "custom",
        path: ["year"],
        message: "year must match date",
      });
    for (const image of [value.cover, ...value.gallery].filter(Boolean))
      if (image && !image.src.startsWith(`/projects/${value.slug}/`))
        ctx.addIssue({
          code: "custom",
          path: ["cover"],
          message: "Asset folder must match slug",
        });
  });
export type ProjectMeta = z.infer<typeof projectSchema>;
export type ProjectDocument = { meta: ProjectMeta; body: string };
