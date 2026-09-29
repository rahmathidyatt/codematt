import { notFound } from "next/navigation";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const supportedLocales = ["id", "en"] as const;

type Locale = (typeof supportedLocales)[number];

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

function isValidLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        {locale === "id" ? "Lewati ke konten" : "Skip to content"}
      </a>

      <Navigation locale={locale} />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer locale={locale} />
    </>
  );
}

export function generateStaticParams() {
  return [
    { locale: "id" },
    { locale: "en" },
  ];
}