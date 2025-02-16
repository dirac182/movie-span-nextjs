import type { Metadata } from "next";
import { Josefin_Sans, League_Spartan } from "next/font/google";
import "./globals.css";

const joseSans = Josefin_Sans({
  
});

const geistMono = League_Spartan({
  variable: "--font-league-spartan-mono",
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
      <body
        className={`${joseSans.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
