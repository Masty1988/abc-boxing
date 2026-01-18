"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface EventImageUploadProps {
  eventId: string | null; // null pour nouvel événement
  currentImageUrl: string;
  onImageUploaded: (url: string) => void;
}

export function EventImageUpload({
  eventId,
  currentImageUrl,
  onImageUploaded,
}: EventImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImageUrl);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    if (!file.type.startsWith("image/")) {
      setError("Le fichier doit être une image");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 10MB");
      return;
    }

    setError(null);
    setUploading(true);

    // Preview local immédiat
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Créer le slot ID basé sur l'événement
      const slotId = eventId ? `event-${eventId}` : `event-temp-${Date.now()}`;

      // 1. Obtenir la signature Cloudinary
      const signatureRes = await fetch("/api/admin/cloudinary-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId }),
      });

      if (!signatureRes.ok) {
        throw new Error("Erreur lors de la génération de la signature");
      }

      const signatureData = await signatureRes.json();

      // 2. Upload vers Cloudinary
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

      // 3. Mettre à jour la base de données (slot événement)
      await fetch("/api/admin/site-images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: slotId,
          url: cloudinaryData.secure_url,
          format: cloudinaryData.format,
          width: cloudinaryData.width,
          height: cloudinaryData.height,
          category: "AUTRE",
          description: `Image événement ${eventId || "temporaire"}`,
        }),
      });

      // Mettre à jour le preview avec l'URL Cloudinary
      setPreview(cloudinaryData.secure_url);
      onImageUploaded(cloudinaryData.secure_url);
    } catch (err) {
      console.error("Erreur upload:", err);
      setError("Erreur lors de l'upload de l'image");
      setPreview(currentImageUrl); // Restore previous preview
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Image de l&apos;événement
      </label>

      <div className="space-y-3">
        {/* Preview */}
        {preview && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-slate-200">
            <Image
              src={preview}
              alt="Preview événement"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Upload button */}
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Upload en cours...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {preview ? "Changer l'image" : "Choisir une image"}
              </>
            )}
          </button>

          {preview && (
            <button
              type="button"
              onClick={() => {
                setPreview("");
                onImageUploaded("");
              }}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors"
            >
              Supprimer
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-600 font-medium">{error}</p>
        )}

        <p className="text-xs text-slate-500">
          Recommandé : 1200x800px • JPG, PNG ou WEBP • Max 10MB
        </p>
      </div>
    </div>
  );
}
