"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui";
import { IMAGES } from "@/lib/constants";
import { GalleryImage } from "@/lib/types";

const images: GalleryImage[] = [
  { id: 1, src: IMAGES.kick, category: "Combat", title: "Combat féminin" },
  { id: 2, src: IMAGES.engage2, category: "Groupe", title: "Équipe Octobre Rose" },
  { id: 3, src: IMAGES.trophee, category: "Podium", title: "Nos trophées" },
  { id: 4, src: IMAGES.choc, category: "Event", title: "Choc des Guerriers" },
  { id: 5, src: IMAGES.fede, category: "Groupe", title: "Stage national" },
  { id: 6, src: IMAGES.engage, category: "Groupe", title: "Octobre Rose" },
  { id: 7, src: IMAGES.hero, category: "Combat", title: "Sur le ring" },
  { id: 8, src: IMAGES.officiel, category: "Staff", title: "Le président" },
];

const filters = ["Tous", "Combat", "Groupe", "Podium", "Event"];

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState("Tous");

  const filtered = filter === "Tous" ? images : images.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24">
      <div className="h-32 bg-gradient-to-b from-purple-900/30 to-transparent flex items-end px-6 pb-4">
        <h1 className="text-3xl font-black">Galerie</h1>
      </div>

      {/* Filtres */}
      <div className="px-4 py-4 flex gap-2 overflow-x-auto no-scrollbar">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
              filter === f
                ? "bg-red-500 text-white"
                : "bg-white/10 text-gray-400 hover:bg-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filtered.map((img, i) => (
          <Card
            key={img.id}
            className={`overflow-hidden ${
              i % 3 === 0 ? "aspect-square" : i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <div className="relative w-full h-full">
              <Image src={img.src} alt={img.title} fill className="object-cover" />
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-[70vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              fill
              className="object-contain"
            />
          </div>
          <p className="text-white mt-4 font-medium">{selectedImage.title}</p>
          <button className="absolute top-4 right-4 text-white text-2xl bg-white/10 w-10 h-10 rounded-full hover:bg-white/20 transition-colors">
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
