import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConditionalNav } from "@/components/layout";

export const metadata: Metadata = {
  title: "ABC Boxing La Rochelle - Savate, Boxe Française & Kickboxing",
  description: "ABC Boxing Club La Rochelle : club de Boxe Française, Savate et Kickboxing K-1. Cours pour enfants et adultes, loisir et compétition.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/images/abc-boxing.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased bg-black">
        <ConditionalNav />
        {children}
      </body>
    </html>
  );
}