import type { Metadata } from "next";
import { Chakra_Petch, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import AppProvider from "@/components/auth/AppProvider";



// Fonts
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

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: {
    default: "FantasyBuzz — US Sports News & Fantasy Draft Simulator",
    template: "%s — FantasyBuzz",
  },
  description:
    "US sports news, fantasy football drafting tools, and a mock draft simulator with live insights.",
  applicationName: "FantasyBuzz",
  authors: [{ name: "FantasyBuzz" }],
  generator: "Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  other: { "msapplication-TileColor": "#007bff" },

  // 🔹 Open Graph (for Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    url: "https://fantasybuzz.com",
    title: "FantasyBuzz — US Sports News & Fantasy Draft Simulator",
    description:
      "Stay updated on US sports, use fantasy football drafting tools, and simulate mock drafts with live insights.",
    siteName: "FantasyBuzz",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },

  // 🔹 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "FantasyBuzz — US Sports News & Fantasy Draft Simulator",
    description:
      "Stay updated on US sports, use fantasy football drafting tools, and simulate mock drafts with live insights.",
    images: ["/og-image.png"],
    creator: "@fantasybuzz",
  },
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
        <QueryProvider>
    
           <AppProvider> 
            {children}
           </AppProvider> 
        </QueryProvider>
      </body>
    </html>
  );
}
