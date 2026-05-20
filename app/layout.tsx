import type { Metadata } from "next";
import "./globals.css";
import { EventJsonLd } from "@/components/EventJsonLd";
import {
  getMetadataBase,
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  SEO_DESCRIPTION,
  SEO_DESCRIPTION_SHORT,
  SEO_KEYWORDS,
  SEO_TITLE,
} from "@/data/seo";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: "PVEP" }],
  creator: "PVEP",
  publisher: "PVEP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION_SHORT,
    type: "website",
    locale: "vi_VN",
    siteName: "PVEP Day 2026",
    url: "/",
    images: [
      {
        url: OG_IMAGE_PATH,
        alt: OG_IMAGE_ALT,
        width: 4500,
        height: 8000,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION_SHORT,
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <EventJsonLd />
        {children}
      </body>
    </html>
  );
}
