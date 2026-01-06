import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header, MobileNav, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "ABC Boxing La Rochelle",
  description: "Club de Boxe Française, Savate et Kickboxing à La Rochelle",
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
        {/* Container principal - max-w-lg pour mobile, centré */}
        <div className="max-w-lg mx-auto bg-[#121212] min-h-screen relative shadow-2xl overflow-hidden">
          <Header />
          <main className="relative">{children}</main>
          <Footer />
          <MobileNav />
        </div>
      </body>
    </html>
  );
}