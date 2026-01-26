"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconClipboard, IconUsers, IconBook, IconGallery } from "@/components/icons";

const navItems = [
  { href: "/", label: "Accueil", icon: IconHome },
  { href: "/inscription", label: "Inscription", icon: IconClipboard },
  { href: "/club", label: "Club", icon: IconUsers },
  { href: "/disciplines", label: "Disciplines", icon: IconBook },
  { href: "/galerie", label: "Histoire", icon: IconGallery },
];

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E]/95 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                isActive
                  ? "text-red-500 bg-red-500/10"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <item.icon />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
