import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
// import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

import { QueryProvider } from "@/components/providers/QueryProvider";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// /** Add your local Creato Display files into /public/fonts (or /app/fonts) */
// const creato = localFont({
//   variable: "--font-creato",
//   display: "swap",
//   src: [
//     {
//       path: "/fonts/CreatoDisplay-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "/fonts/CreatoDisplay-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     { path: "/fonts/CreatoDisplay-Bold.woff2", weight: "700", style: "normal" },
//   ],
// });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Community Booking Platform",
    template: "%s — Community Booking Platform",
  },
  description: "ccommunity matkretplace etc",
  applicationName: "Community Booking Platform",
  generator: "Next.js",
  authors: [{ name: "Community" }],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  other: { "msapplication-TileColor": "#007bff" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={[
          chakra.variable, // global default
          inter.variable, // paragraphs
          // creato.variable, // subtitles/smaller titles
          geistMono.variable, // mono
          "min-h-dvh bg-background text-foreground antialiased",
        ].join(" ")}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
