import { getNotes } from "@/lib/content/notes.server";
import { siteOrigin, canIndex } from "@/lib/site-url";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/config/site";
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
    metadataBase: new URL(siteOrigin()),
    robots: { index: canIndex(), follow: canIndex() },
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
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteOrigin()}/#website`,
                  url: siteOrigin(),
                  name: site.name,
                  inLanguage: ["id", "en"],
                },
                {
                  "@type": "Person",
                  "@id": `${siteOrigin()}/#person`,
                  name: site.owner,
                  url: siteOrigin(),
                  ...(site.github || site.linkedin
                    ? { sameAs: [site.github, site.linkedin].filter(Boolean) }
                    : {}),
                },
              ],
            }}
          />
          <a className="skip-link" href="#main">
            {dictionaries[locale].skip}
          </a>
          <Navigation
            locale={locale}
            entries={buildSearchIndex(
              await getProjects(locale),
              locale,
              await getNotes(locale),
            )}
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
