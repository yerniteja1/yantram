import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  SITE_DESCRIPTION,
  SITE_DESCRIPTOR,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FBF9F6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_DESCRIPTOR} | Web, Mobile, Backend, AI & E-commerce`,
    template: `%s | ${SITE_NAME} ${SITE_DESCRIPTOR}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Yantram",
    "digital product studio",
    "web development",
    "mobile app development",
    "backend engineering",
    "AI automation",
    "AI integration",
    "e-commerce development",
    "product maintenance",
    "design systems",
    "MVP development",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${SITE_NAME} — ${SITE_DESCRIPTOR}`,
    title: `${SITE_NAME} — ${SITE_DESCRIPTOR}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — ${SITE_DESCRIPTOR}`,
    description: SITE_DESCRIPTION,
    images: ["/android-chrome-512x512.png"],
  },
};

// Structured data: helps search engines show rich results (logo, contact).
// Yantram is positioned as a software / product-development brand —
// distinct from the unrelated architectural-visualization "Yantram Studio".
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: `${SITE_NAME} — ${SITE_DESCRIPTOR}`,
  alternateName: SITE_NAME,
  url: SITE_URL,
  slogan: SITE_TAGLINE,
  description: SITE_DESCRIPTION,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE_DISPLAY,
  makesOffer: [
    "Web Development",
    "Mobile App Development",
    "Backend Engineering",
    "AI & Automation",
    "E-commerce Development",
    "Product Maintenance",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_DISPLAY,
    contactType: "sales",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${syne.variable} ${grotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
