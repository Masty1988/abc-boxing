import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, 'loading' | 'quality'> {
  /**
   * Si true, l'image sera chargée avec priority (hero, above-fold)
   * Si false, lazy loading automatique (défaut)
   */
  priority?: boolean;

  /**
   * Qualité de l'image (défaut: 85)
   */
  quality?: number;
}

/**
 * Composant Image optimisé avec lazy loading par défaut
 * Usage:
 * - <OptimizedImage src="..." alt="..." fill priority /> pour images hero
 * - <OptimizedImage src="..." alt="..." fill /> pour toutes les autres (lazy auto)
 */
export function OptimizedImage({
  priority = false,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      quality={quality}
    />
  );
}
