import type { MetadataRoute } from "next";
import { siteOrigin, canIndex } from "@/lib/site-url";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: canIndex()
      ? { userAgent: "*", allow: "/", disallow: ["/og", "/_vercel/"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteOrigin()}/sitemap.xml`,
  };
}
