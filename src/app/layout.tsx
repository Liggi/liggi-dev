import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});

// Departure Mono v1.500 (SIL OFL 1.1, see fonts/OFL.txt)
const departure = localFont({
  src: "./fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure",
});

export const metadata: Metadata = {
  title: {
    default: "liggi.dev",
    template: "%s | liggi.dev",
  },
  description: "Notes, research, and explorations",
  metadataBase: new URL("https://liggi.dev"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "liggi.dev",
  },
  twitter: {
    card: "summary",
    creator: "@liggi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${newsreader.variable} ${departure.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
