import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Travio | Smart GPS Tracking Systems for Vehicles, Fleets & Assets",
  description: "Travio - Professional GPS tracking solutions. Real-time vehicle tracking, fleet management, and asset monitoring trusted by 94,000+ users across 185 countries.",
  keywords: "GPS tracker, vehicle tracking, fleet management, real-time tracking, car tracker, asset tracking, GPS tracking system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans min-h-screen bg-background text-foreground flex flex-col`}>
        <Providers>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
