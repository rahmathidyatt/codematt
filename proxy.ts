import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "./lib/i18n";
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (isLocale(path.split("/")[1])) return NextResponse.next();
  const saved = request.cookies.get("codematt-locale")?.value;
  const locale = saved && isLocale(saved) ? saved : "id";
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${path === "/" ? "" : path}`;
  return NextResponse.redirect(url);
}
export const config = {
  matcher: ["/((?!_next/|projects/|favicon.svg|robots.txt|sitemap.xml).*)"],
};
