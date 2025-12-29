import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
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
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
