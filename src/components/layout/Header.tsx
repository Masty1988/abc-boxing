"use client";

import { IconPhone, IconClock } from "@/components/icons";
import { CONTACT } from "@/lib/constants";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#1E1E1E]/95 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <a
          href={CONTACT.phoneLink}
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
        >
          <IconPhone />
          <span className="font-bold text-sm">{CONTACT.phone}</span>
        </a>
        <div className="flex items-center gap-2 text-gray-400">
          <IconClock />
          <span className="text-xs">Mar-Jeu-Ven 19h30-22h</span>
        </div>
      </div>
    </header>
  );
};
