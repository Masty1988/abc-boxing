import Image, { ImageProps } from "next/image";
import { getOptimizedUrl } from "@/lib/cloudinary";

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
 * - Attribut sizes pour responsive
 *
 * Usage:
 * - <OptimizedImage src="..." alt="..." fill priority imageSize="hero" /> pour hero
 * - <OptimizedImage src="..." alt="..." fill imageSize="gallery" /> pour galerie
 */
export function OptimizedImage({
  priority = false,
  quality = 85,
  alt,
  src,
  sizes,
  imageSize = "gallery",
  ...props
}: OptimizedImageProps) {
  // Optimiser l'URL Cloudinary si applicable
  const optimizedSrc =
    typeof src === "string" ? getOptimizedUrl(src, SIZE_MAP[imageSize]) : src;

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
