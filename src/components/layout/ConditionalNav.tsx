"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { ScrollToTop } from "@/components/ui";

export function ConditionalNav() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/taz");

  // Ne pas afficher Header, MobileNav et ScrollToTop sur les pages admin
  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <Header />
      <MobileNav />
      <ScrollToTop />
    </>
  );
}
