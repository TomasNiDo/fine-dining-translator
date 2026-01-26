import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: "Fine Dining Translator",
  description: "Turn your simple dish into a pretentious menu masterpiece.",
  openGraph: {
    title: "Fine Dining Translator",
    description: "Turn your simple dish into a pretentious menu masterpiece.",
    siteName: "Fine Dining Translator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 600,
        alt: "Fine Dining Translator - Transform simple dishes into pretentious menu descriptions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fine Dining Translator",
    description: "Turn your simple dish into a pretentious menu masterpiece.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-cream font-body text-charcoal min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
