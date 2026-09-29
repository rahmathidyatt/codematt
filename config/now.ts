import { z } from "zod";
const translated = z.object({ id: z.string().min(1), en: z.string().min(1) });
export const now = z
  .object({ updated: z.iso.date(), building: translated, learning: translated })
  .parse({
    updated: "2026-09-29",
    building: {
      id: "Mengembangkan codematt menjadi rumah untuk proyek web, data, dan eksperimen, dengan pengalaman membaca dalam dua bahasa.",
      en: "Developing codematt into a home for web projects, data, and experiments, with a bilingual reading experience.",
    },
    learning: {
      id: "Sistem konten yang mudah dirawat, antarmuka aksesibel, dan alur publikasi proyek yang sederhana.",
      en: "Maintainable content systems, accessible interfaces, and a simple project publishing workflow.",
    },
  });
