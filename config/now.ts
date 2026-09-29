import { z } from "zod";
export const now = z
  .object({ updated: z.iso.date(), building: z.string(), learning: z.string() })
  .parse({
    updated: "2026-09-29",
    building: "A home for code, data and ongoing experiments.",
    learning: "Maintainable content systems with TypeScript and MDX.",
  });
