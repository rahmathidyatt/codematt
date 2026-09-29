export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);
export function localizedPath(locale: Locale, path = "") {
  return `/${locale}${path === "/" ? "" : path}`;
}
export function switchLocalePath(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = locale;
  else parts.splice(1, 0, locale);
  return parts.join("/") || `/${locale}`;
}
