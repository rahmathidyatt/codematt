import { z } from "zod";

const siteSchema = z.object({
  name: z.string(),
  owner: z.string(),
  description: z.string(),

  url: z.string().url(),

  email: z.string().email().optional(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  resume: z.string().optional(),
});

export const site = siteSchema.parse({
  name: "codematt",

  owner: "Rahmat Hidayat",

  description:
    "Useful things, built with code, data & curiosity. A personal portfolio and digital lab by Rahmat Hidayat.",

  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000",
});

const navigationSchema = z.array(
  z.object({
    label: z.string(),

    href: z
      .string()
      .regex(
        /^\/(?:[a-z0-9-]+)?$/,
        "Navigation href must be '/' or a path such as '/work'.",
      ),
  }),
);

export const navigation = navigationSchema.parse([
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Lab",
    href: "/lab",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Notes",
    href: "/notes",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]);