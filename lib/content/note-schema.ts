import { z } from "zod";
import type { Locale } from "../i18n";
export const noteSchema = z
  .object({
    title: z.string().trim().min(1).max(120),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    summary: z.string().trim().min(1).max(240),
    date: z.iso.date(),
    updated: z.iso.date().optional(),
    tags: z.array(z.string().trim().min(1)).default([]),
    status: z.enum(["draft", "published"]).default("draft"),
  })
  .strict()
  .refine((v) => !v.updated || v.updated >= v.date, {
    message: "updated must not precede date",
    path: ["updated"],
  });
export type NoteMeta = z.infer<typeof noteSchema>;
export type Heading = { id: string; text: string; depth: number };
export type NoteDocument = {
  meta: NoteMeta;
  body: string;
  contentLocale: Locale;
  headings: Heading[];
  readingMinutes: number;
};
export type NoteSummary = NoteMeta & {
  contentLocale: Locale;
  readingMinutes: number;
};
