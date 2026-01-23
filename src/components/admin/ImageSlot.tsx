"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { ImageSlot as ImageSlotType } from "@/config/site-images";

interface ImageSlotProps {
  slot: ImageSlotType;
  currentUrl: string | null;
  onUploadSuccess: () => void;
}

export function ImageSlot({ slot, currentUrl, onUploadSuccess }: ImageSlotProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation du fichier
    if (!file.type.startsWith("image/")) {
      setError("Le fichier doit être une image");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB max
      setError("L'image ne doit pas dépasser 10MB");
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      // 1. Obtenir la signature depuis l'API
      const signatureRes = await fetch("/api/admin/cloudinary-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: slot.id }),
      });

      if (!signatureRes.ok) {
        throw new Error("Erreur lors de la génération de la signature");
      }

      const signatureData = await signatureRes.json();

      // 2. Upload vers Cloudinary (client-side upload)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.apiKey);
      formData.append("timestamp", signatureData.timestamp);
      formData.append("signature", signatureData.signature);
      formData.append("folder", signatureData.folder);
      formData.append("public_id", signatureData.publicId);
      formData.append("overwrite", "true");
      formData.append("invalidate", "true");

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryRes.ok) {
        throw new Error("Erreur lors de l'upload Cloudinary");
      }

      const cloudinaryData = await cloudinaryRes.json();

      // 3. Mettre à jour la base de données via API
      const updateRes = await fetch("/api/admin/site-images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: slot.id,
          url: cloudinaryData.secure_url,
          format: cloudinaryData.format,
          width: cloudinaryData.width,
          height: cloudinaryData.height,
          category: slot.category,
        }),
      });

      if (!updateRes.ok) {
        throw new Error("Erreur lors de la mise à jour de la base de données");
      }

      setProgress(100);
      setTimeout(() => {
        onUploadSuccess();
        setUploading(false);
        setProgress(0);
      }, 500);
    } catch (err) {
      console.error("Erreur upload:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">{slot.label}</h3>
          <p className="text-xs text-slate-500 mt-1">{slot.description}</p>
        </div>
        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
          {slot.category}
        </span>
      </div>

      {/* Aperçu de l'image actuelle */}
      <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden mb-3">
        {currentUrl ? (
          <Image
            src={currentUrl}
            alt={slot.label}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
            Aucune image
          </div>
        )}
      </div>

      {/* Dimensions recommandées */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span>
          📐 {slot.width} × {slot.height}px recommandé
        </span>
      </div>

      {/* Barre de progression */}
      {uploading && (
        <div className="mb-3">
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-red-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1 text-center">
            Upload en cours... {progress}%
          </p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      {/* Bouton Remplacer */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Upload...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Remplacer l&apos;image
          </>
        )}
      </button>
    </div>
  );
}
