import type { Metadata, Viewport } from "next";
import "./globals.css";
// import { Header, MobileNav, Footer } from "@/components/layout"; // Désactivé pour Coming Soon

export const metadata: Metadata = {
  title: "ABC Boxing La Rochelle - Bientôt disponible",
  description: "Le nouveau site ABC Boxing Club La Rochelle arrive bientôt ! Boxe Française, Savate et Kickboxing.",
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
    <html lang="fr">
      <head>
        <link rel="icon" href="/images/abc-boxing.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased bg-black">
        {/* Coming Soon - Layout simple sans navigation */}
        {children}
      </body>
    </html>
  );
}