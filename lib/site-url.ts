export function siteOrigin() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  const url = new URL(raw);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("NEXT_PUBLIC_SITE_URL must use http or https");
  return url.origin;
}
export function canIndex() {
  return (
    Boolean(process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://")) &&
    process.env.VERCEL_ENV !== "preview"
  );
}
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
