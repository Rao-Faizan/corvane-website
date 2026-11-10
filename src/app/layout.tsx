import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getProducts, getSiteSettings, getSolutions } from "@/lib/content";
import { getSiteUrl, isIndexingAllowed } from "@/lib/site-url";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Corvane Consulting — Business Systems. Intelligent Solutions.",
    template: "%s | Corvane Consulting",
  },
  description:
    "Corvane Consulting designs enterprise software and AI-powered systems that simplify operations, connect teams and support better decisions.",
  applicationName: "Corvane Consulting",
  openGraph: { siteName: "Corvane Consulting", type: "website", locale: "en" },
  twitter: { card: "summary_large_image" },
  robots: isIndexingAllowed() ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#101827",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [products, solutions, settings] = await Promise.all([getProducts(), getSolutions(), getSiteSettings()]);
  const navProducts = products.map(({ name, slug, category }) => ({ name, slug, category }));

  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-dvh antialiased">
        <Header products={navProducts} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer
          products={products.map(({ name, slug }) => ({ name, slug }))}
          solutions={solutions.map(({ title, slug }) => ({ title, slug }))}
          settings={settings}
        />
      </body>
    </html>
  );
}
