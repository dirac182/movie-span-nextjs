import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import Script from "next/script";

const joseSans = Josefin_Sans({
  subsets: ['latin'],
});


export const metadata: Metadata = {
  metadataBase: new URL('https://moviespan.net'),
  title: "Movie Span",
  description: "Calculate what time a movie will end, whether you're watching it at home or in a theater.",
  keywords: ["movie", "runtime", "time", "end", "theater", "runtime calculator"],
  openGraph: {
    title: 'Movie Span',
    description: "Calculate what time a movie will end, whether you're watching it at home or in a theater.",
    url: 'https://moviespan.net',
    siteName: 'Movie Span',
    images: [
      {
        url: './moviespan-img.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },],
    locale: 'en_US',
    type: 'website',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${joseSans.className} antialiased`}>
        {children}
        <Analytics />
        <Script
          defer src="https://analytics.tarsdrive.cc/script.js" data-website-id="9c33b10c-d81e-4c93-ba69-ff77c189818c">
        </Script>
      </body>
    </html>
  );
}
