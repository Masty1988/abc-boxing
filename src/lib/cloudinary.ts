// Helper pour récupérer les images depuis Cloudinary (via BDD)
import { prisma } from "./prisma";

// Type pour les données d'image avec cache busting
export interface ImageData {
  url: string;
  updatedAt: Date | null;
}

// Cache en mémoire pour éviter les requêtes répétées
let imageCache: Record<string, ImageData> | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 heure (optimisation perf)

// =============================================================================
// OPTIMISATION IMAGES CLOUDINARY
// =============================================================================

/**
 * Ajoute les transformations Cloudinary pour optimiser une image
 * @param url - URL Cloudinary originale
 * @param width - Largeur cible en pixels
 * @param quality - Qualite (auto, auto:low, auto:eco, auto:good, auto:best)
 * @returns URL optimisee avec transformations
 */
export function getOptimizedUrl(
  url: string,
  width: number = 800,
  quality: string = "auto"
): string {
  if (!url || !url.includes("cloudinary.com")) return url;

  // Transformations: width, format auto (webp/avif), qualite auto
  const transforms = `w_${width},f_auto,q_${quality}`;
  return url.replace("/upload/", `/upload/${transforms}/`);
}

/**
 * URL optimisee avec cache busting base sur updatedAt
 */
export function getOptimizedUrlWithVersion(
  url: string,
  width: number = 800,
  updatedAt?: Date | string
): string {
  let optimized = getOptimizedUrl(url, width);
  if (updatedAt) {
    const version = new Date(updatedAt).getTime();
    optimized += `?v=${version}`;
  }
  return optimized;
}

// Helpers par contexte d'utilisation
export const getHeroUrl = (url: string) => getOptimizedUrl(url, 1200);
export const getGalleryUrl = (url: string) => getOptimizedUrl(url, 800);
export const getThumbnailUrl = (url: string) => getOptimizedUrl(url, 400);
export const getLogoUrl = (url: string) => getOptimizedUrl(url, 200);

// =============================================================================
// GESTION CACHE ET REQUETES BDD
// =============================================================================

/**
 * Récupère une image Cloudinary par son ID de slot
 * Retourne l'URL Cloudinary et updatedAt pour cache busting
 */
export async function getCloudinaryImage(slotId: string): Promise<ImageData> {
  const now = Date.now();

  // Vérifier le cache
  if (imageCache && now - cacheTimestamp < CACHE_DURATION) {
    return imageCache[slotId] || { url: `/images/placeholder.jpg`, updatedAt: null };
  }

  // Charger toutes les images depuis la BDD
  try {
    const images = await prisma.siteImage.findMany({
      select: {
        key: true,
        url: true,
        updatedAt: true,
      },
    });

    // Construire le cache (slotId → ImageData)
    imageCache = {};
    for (const image of images) {
      imageCache[image.key] = {
        url: image.url,
        updatedAt: image.updatedAt,
      };
    }
    cacheTimestamp = now;

    return imageCache[slotId] || { url: `/images/placeholder.jpg`, updatedAt: null };
  } catch (error) {
    console.error("Erreur chargement Cloudinary:", error);
    return { url: `/images/placeholder.jpg`, updatedAt: null };
  }
}

/**
 * Récupère toutes les images d'un coup
 * Retourne un objet { "ui-logo-club": { url, updatedAt }, ... }
 */
export async function getAllCloudinaryImages(): Promise<Record<string, ImageData>> {
  const now = Date.now();

  if (imageCache && now - cacheTimestamp < CACHE_DURATION) {
    return imageCache;
  }

  try {
    const images = await prisma.siteImage.findMany({
      select: {
        key: true,
        url: true,
        updatedAt: true,
      },
    });

    imageCache = {};
    for (const image of images) {
      imageCache[image.key] = {
        url: image.url,
        updatedAt: image.updatedAt,
      };
    }
    cacheTimestamp = now;

    return imageCache;
  } catch (error) {
    console.error("Erreur chargement Cloudinary:", error);
    return {};
  }
}

/**
 * Invalide le cache (utile après upload d'une nouvelle image)
 */
export function invalidateImageCache() {
  imageCache = null;
  cacheTimestamp = 0;
}
