import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { getLocale } from "@/lib/locale.server";
import { locales } from "@/lib/i18n";
import { dictionaries } from "@/config/messages";
import "@/styles/globals.css";
import { getProjects } from "@/lib/content/repository.server";
import { buildSearchIndex } from "@/lib/search";
const sans = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-sans",
  display: "swap",
});
const mono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-mono",
  display: "swap",
});
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocale(params);
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"),
    ),
    title: { default: "codematt", template: "%s · codematt" },
    description: dictionaries[locale].intro,
    icons: { icon: "/favicon.svg" },
  };
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            {dictionaries[locale].skip}
          </a>
          <Navigation
            locale={locale}
            entries={buildSearchIndex(await getProjects(locale), locale)}
          />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
