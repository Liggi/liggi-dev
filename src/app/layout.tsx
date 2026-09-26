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
    default: "Jason Liggi · software engineer, LLM obsessive",
    template: "%s · Jason Liggi",
  },
  description: "software engineer. LLM obsessive. i spend a lot of time figuring out how to make LLMs do interesting things, mostly narrative content for paradox games.",
  authors: [{ name: "Jason Liggi", url: "https://www.liggi.dev" }],
  metadataBase: new URL("https://www.liggi.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "liggi.dev",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
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
