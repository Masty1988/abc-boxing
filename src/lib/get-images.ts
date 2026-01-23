// Fonction serveur pour récupérer les images depuis Cloudinary
// À utiliser dans les Server Components

import { getAllCloudinaryImages, ImageData } from "./cloudinary";

/**
 * Interface avec URLs et timestamps pour cache busting
 */
export interface SiteImages {
  // UI
  "ui-logo-club": ImageData;
  "ui-hero-accueil": ImageData;
  "ui-background-contact": ImageData;
  "ui-club-histoire": ImageData;
  "ui-trophees": ImageData;

  // Combat
  "combat-gala-principal": ImageData;
  "combat-champion-1": ImageData;
  "combat-champion-2": ImageData;

  // Entraînement
  "entrainement-groupe-1": ImageData;
  "entrainement-coach": ImageData;
  "entrainement-technique": ImageData;

  // Galerie Palmarès
  "palmares-trophees-1": ImageData;
  "palmares-trophees-2": ImageData;
  "palmares-trophees-3": ImageData;
  "palmares-medailles-1": ImageData;

  // Galerie Salle
  "salle-vue-generale": ImageData;
  "salle-sacs": ImageData;
  "salle-ring": ImageData;
  "salle-entrainement-1": ImageData;

  // Galerie Ring
  "ring-combat-1": ImageData;
  "ring-combat-2": ImageData;
  "ring-victoire-1": ImageData;
  "ring-podium-1": ImageData;
}

const PLACEHOLDER: ImageData = { url: "/images/placeholder.svg", updatedAt: null };

/**
 * Récupère toutes les images du site depuis Cloudinary
 * Retourne les URLs et timestamps pour cache busting
 */
export async function getImages(): Promise<SiteImages> {
  const cloudinaryImages = await getAllCloudinaryImages();

  return {
    // UI
    "ui-logo-club": cloudinaryImages["ui-logo-club"] || PLACEHOLDER,
    "ui-hero-accueil": cloudinaryImages["ui-hero-accueil"] || PLACEHOLDER,
    "ui-background-contact": cloudinaryImages["ui-background-contact"] || PLACEHOLDER,
    "ui-club-histoire": cloudinaryImages["ui-club-histoire"] || PLACEHOLDER,
    "ui-trophees": cloudinaryImages["ui-trophees"] || PLACEHOLDER,

    // Combat
    "combat-gala-principal": cloudinaryImages["combat-gala-principal"] || PLACEHOLDER,
    "combat-champion-1": cloudinaryImages["combat-champion-1"] || PLACEHOLDER,
    "combat-champion-2": cloudinaryImages["combat-champion-2"] || PLACEHOLDER,

    // Entraînement
    "entrainement-groupe-1": cloudinaryImages["entrainement-groupe-1"] || PLACEHOLDER,
    "entrainement-coach": cloudinaryImages["entrainement-coach"] || PLACEHOLDER,
    "entrainement-technique": cloudinaryImages["entrainement-technique"] || PLACEHOLDER,

    // Galerie Palmarès
    "palmares-trophees-1": cloudinaryImages["palmares-trophees-1"] || PLACEHOLDER,
    "palmares-trophees-2": cloudinaryImages["palmares-trophees-2"] || PLACEHOLDER,
    "palmares-trophees-3": cloudinaryImages["palmares-trophees-3"] || PLACEHOLDER,
    "palmares-medailles-1": cloudinaryImages["palmares-medailles-1"] || PLACEHOLDER,

    // Galerie Salle
    "salle-vue-generale": cloudinaryImages["salle-vue-generale"] || PLACEHOLDER,
    "salle-sacs": cloudinaryImages["salle-sacs"] || PLACEHOLDER,
    "salle-ring": cloudinaryImages["salle-ring"] || PLACEHOLDER,
    "salle-entrainement-1": cloudinaryImages["salle-entrainement-1"] || PLACEHOLDER,

    // Galerie Ring
    "ring-combat-1": cloudinaryImages["ring-combat-1"] || PLACEHOLDER,
    "ring-combat-2": cloudinaryImages["ring-combat-2"] || PLACEHOLDER,
    "ring-victoire-1": cloudinaryImages["ring-victoire-1"] || PLACEHOLDER,
    "ring-podium-1": cloudinaryImages["ring-podium-1"] || PLACEHOLDER,
  };
}
