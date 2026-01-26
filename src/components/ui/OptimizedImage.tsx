import Image, { ImageProps } from "next/image";
import { getOptimizedUrlWithVersion } from "@/lib/cloudinary";

type ImageSize = "hero" | "gallery" | "thumbnail" | "logo" | "card";

interface OptimizedImageProps extends Omit<ImageProps, "loading" | "quality"> {
  /**
   * Si true, l'image sera chargee avec priority (hero, above-fold)
   * Si false, lazy loading automatique (defaut)
   */
  priority?: boolean;

  /**
   * Qualite de l'image (defaut: 85)
   */
  quality?: number;

  /**
   * Taille preset pour optimisation Cloudinary
   * - hero: 1200px (banner, hero images)
   * - gallery: 800px (galerie, photos club)
   * - card: 600px (event cards)
   * - thumbnail: 400px (miniatures)
   * - logo: 200px (logos)
   */
  imageSize?: ImageSize;

  /**
   * Timestamp pour cache busting (updatedAt de SiteImage)
   */
  updatedAt?: Date | string | null;
}

// Mapping des tailles vers largeurs pixels
const SIZE_MAP: Record<ImageSize, number> = {
  hero: 1200,
  gallery: 800,
  card: 600,
  thumbnail: 400,
  logo: 200,
};

// Mapping des tailles vers attribut sizes responsive
const SIZES_MAP: Record<ImageSize, string> = {
  hero: "(max-width: 768px) 100vw, 1200px",
  gallery: "(max-width: 768px) 100vw, 800px",
  card: "(max-width: 768px) 100vw, 600px",
  thumbnail: "(max-width: 768px) 50vw, 400px",
  logo: "200px",
};

/**
 * Composant Image optimise avec:
 * - Lazy loading par defaut
 * - Transformations Cloudinary automatiques (w_XXX, f_auto, q_auto)
 * - Cache busting via ?v=timestamp (si updatedAt fourni)
 * - Attribut sizes pour responsive
 *
 * Usage:
 * - <OptimizedImage src="..." alt="..." fill priority imageSize="hero" updatedAt={date} />
 * - <OptimizedImage src={imageData.url} alt="..." fill imageSize="gallery" updatedAt={imageData.updatedAt} />
 */
export function OptimizedImage({
  priority = false,
  quality = 85,
  alt,
  src,
  sizes,
  imageSize = "gallery",
  updatedAt,
  ...props
}: OptimizedImageProps) {
  // Optimiser l'URL Cloudinary avec cache busting si applicable
  const optimizedSrc =
    typeof src === "string"
      ? getOptimizedUrlWithVersion(src, SIZE_MAP[imageSize], updatedAt || undefined)
      : src;

  // Utiliser sizes fourni ou le defaut selon imageSize
  const responsiveSizes = sizes || SIZES_MAP[imageSize];

  return (
    <Image
      {...props}
      src={optimizedSrc}
      alt={alt}
      sizes={responsiveSizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      quality={quality}
    />
  );
}
