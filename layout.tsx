import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/config/site";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url || "http://localhost:3000"),

  title: {
    default: "codematt — Code, data & curiosity",
    template: "%s · codematt",
  },

  description: site.description,

  icons: {
    icon: "/favicon.svg",
  },

  openGraph: {
    type: "website",
    siteName: "codematt",
    title: "codematt — Code, data & curiosity",
    description: site.description,
    url: site.url || "http://localhost:3000",
  },

  twitter: {
    card: "summary_large_image",
    title: "codematt — Code, data & curiosity",
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}