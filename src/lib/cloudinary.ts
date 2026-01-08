// Helper pour récupérer les images depuis Cloudinary (via BDD)
import { prisma } from "./prisma";

// Mapping : ancien nom de fichier → slot ID Cloudinary
const IMAGE_MAPPING: Record<string, string> = {
  "abc-boxing.jpg": "ui-logo-club",
  "hero.jpg": "ui-hero-accueil",
  "choc.jpg": "combat-gala-principal",
  "kick.jpg": "entrainement-technique",
  "trophee.jpg": "combat-champion-1",
  "engage.jpg": "entrainement-groupe-1",
  "engage2.jpg": "combat-champion-2",
  "fede.jpg": "entrainement-coach",
  "officiel.jpg": "ui-club-histoire",
};

// Cache en mémoire pour éviter les requêtes répétées
let imageCache: Record<string, string> | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Récupère une image Cloudinary par son ancien nom de fichier
 * Fallback : retourne l'URL /images/{fileName} si non trouvée dans Cloudinary
 */
export async function getCloudinaryImage(fileName: string): Promise<string> {
  // 1. Vérifier le cache
  const now = Date.now();
  if (imageCache && now - cacheTimestamp < CACHE_DURATION) {
    return imageCache[fileName] || `/images/${fileName}`;
  }

  // 2. Charger toutes les images depuis la BDD
  try {
    const images = await prisma.siteImage.findMany({
      select: {
        key: true,
        url: true,
      },
    });

    // 3. Construire le cache inversé (fileName → URL)
    imageCache = {};
    for (const [oldName, slotId] of Object.entries(IMAGE_MAPPING)) {
      const image = images.find((img) => img.key === slotId);
      if (image) {
        imageCache[oldName] = image.url;
      }
    }
    cacheTimestamp = now;

    // 4. Retourner l'URL ou fallback
    return imageCache[fileName] || `/images/${fileName}`;
  } catch (error) {
    console.error("Erreur chargement Cloudinary:", error);
    // Fallback en cas d'erreur
    return `/images/${fileName}`;
  }
}

/**
 * Récupère toutes les images d'un coup (pour éviter N requêtes)
 * Retourne un objet { logo: "url", hero: "url", ... }
 */
export async function getAllCloudinaryImages(): Promise<Record<string, string>> {
  const now = Date.now();
  if (imageCache && now - cacheTimestamp < CACHE_DURATION) {
    return imageCache;
  }

  try {
    const images = await prisma.siteImage.findMany({
      select: {
        key: true,
        url: true,
      },
    });

    imageCache = {};
    for (const [oldName, slotId] of Object.entries(IMAGE_MAPPING)) {
      const image = images.find((img) => img.key === slotId);
      imageCache[oldName] = image?.url || `/images/${oldName}`;
    }
    cacheTimestamp = now;

    return imageCache;
  } catch (error) {
    console.error("Erreur chargement Cloudinary:", error);
    // Fallback : retourner les URLs locales
    return Object.fromEntries(
      Object.keys(IMAGE_MAPPING).map((name) => [name, `/images/${name}`])
    );
  }
}

/**
 * Invalide le cache (utile après upload d'une nouvelle image)
 */
export function invalidateImageCache() {
  imageCache = null;
  cacheTimestamp = 0;
}
