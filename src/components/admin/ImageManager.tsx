"use client";

import { useState, useEffect } from "react";
import { EDITABLE_IMAGES, getSlotsByCategory } from "@/config/site-images";
import { ImageSlot } from "./ImageSlot";

interface SiteImage {
  key: string;
  url: string;
}

export function ImageManager() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<"all" | "UI" | "COMBAT" | "ENTRAINEMENT">("all");

  // Charger toutes les images depuis la BDD
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/site-images");
      if (res.ok) {
        const data = await res.json();
        setImages(data.images || []);
      }
    } catch (error) {
      console.error("Erreur chargement images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Récupérer l'URL actuelle d'un slot
  const getCurrentUrl = (slotId: string): string | null => {
    const image = images.find((img) => img.key === slotId);
    return image?.url || null;
  };

  // Filtrer les slots selon la catégorie active
  const filteredSlots =
    activeCategory === "all"
      ? EDITABLE_IMAGES
      : getSlotsByCategory(activeCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Chargement des images...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filtres par catégorie */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: "all", label: "Toutes", icon: "🖼️" },
          { id: "UI", label: "Interface", icon: "🎨" },
          { id: "COMBAT", label: "Combats", icon: "🥊" },
          { id: "ENTRAINEMENT", label: "Entraînement", icon: "💪" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat.id
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white text-slate-600 border border-slate-200 hover:border-red-500 hover:text-red-500"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">ℹ️</div>
          <div>
            <h3 className="font-bold text-blue-900 text-sm mb-1">
              Système de remplacement d&apos;images
            </h3>
            <p className="text-blue-700 text-xs">
              Vous ne pouvez pas créer de nouveaux emplacements. Chaque slot ci-dessous
              remplace une image existante sur le site. Le nom du fichier est automatique.
            </p>
            <p className="text-blue-600 text-xs mt-2">
              📊 <strong>{filteredSlots.length}</strong> emplacements disponibles •{" "}
              <strong>{images.length}</strong> images actuellement en ligne
            </p>
          </div>
        </div>
      </div>

      {/* Grille des slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSlots.map((slot) => (
          <ImageSlot
            key={slot.id}
            slot={slot}
            currentUrl={getCurrentUrl(slot.id)}
            onUploadSuccess={fetchImages}
          />
        ))}
      </div>

      {filteredSlots.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          Aucun emplacement dans cette catégorie
        </div>
      )}
    </div>
  );
}
