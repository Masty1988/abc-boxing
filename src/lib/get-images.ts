// Fonction serveur pour récupérer les images depuis Cloudinary
// À utiliser dans les Server Components

import { getAllCloudinaryImages } from "./cloudinary";

export interface SiteImages {
  logo: string;
  hero: string;
  choc: string;
  kick: string;
  trophee: string;
  engage: string;
  engage2: string;
  fede: string;
  officiel: string;
}

/**
 * Récupère toutes les images du site (Cloudinary + fallback local)
 * À appeler dans Server Components uniquement
 */
export async function getImages(): Promise<SiteImages> {
  const images = await getAllCloudinaryImages();

  return {
    logo: images["abc-boxing.jpg"],
    hero: images["hero.jpg"],
    choc: images["choc.jpg"],
    kick: images["kick.jpg"],
    trophee: images["trophee.jpg"],
    engage: images["engage.jpg"],
    engage2: images["engage2.jpg"],
    fede: images["fede.jpg"],
    officiel: images["officiel.jpg"],
  };
}
