import { z } from "zod";
const siteSchema = z.object({
  name: z.string(),
  owner: z.string(),
  description: z.string(),
  email: z.email().optional(),
  github: z.url().optional(),
  linkedin: z.url().optional(),
  resume: z.string().optional(),
});
export const site = siteSchema.parse({
  name: "codematt",
  owner: "Rahmat Hidayat",
  description:
    "Useful things, built with code, data & curiosity. A personal portfolio and digital lab by Rahmat Hidayat.",
});
const navigationSchema = z.array(
  z.object({ label: z.string(), href: z.string().regex(/^\/[a-z]*$/) }),
);
export const navigation = navigationSchema.parse([
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
  { label: "Notes", href: "/notes" },
  { label: "Contact", href: "/contact" },
]);
