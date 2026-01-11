// Fonction serveur pour récupérer les images depuis Cloudinary
// À utiliser dans les Server Components

import { getAllCloudinaryImages } from "./cloudinary";

/**
 * Interface simplifiée : on utilise directement les IDs Cloudinary
 * Plus de mapping compliqué !
 */
export interface SiteImages {
  // UI
  "ui-logo-club": string;
  "ui-hero-accueil": string;
  "ui-background-contact": string;
  "ui-club-histoire": string;
  "ui-trophees": string;

  // Combat
  "combat-gala-principal": string;
  "combat-champion-1": string;
  "combat-champion-2": string;

  // Entraînement
  "entrainement-groupe-1": string;
  "entrainement-coach": string;
  "entrainement-technique": string;

  // Galerie Palmarès
  "palmares-trophees-1": string;
  "palmares-trophees-2": string;
  "palmares-trophees-3": string;
  "palmares-medailles-1": string;

  // Galerie Salle
  "salle-vue-generale": string;
  "salle-sacs": string;
  "salle-ring": string;
  "salle-entrainement-1": string;

  // Galerie Ring
  "ring-combat-1": string;
  "ring-combat-2": string;
  "ring-victoire-1": string;
  "ring-podium-1": string;
}

/**
 * Récupère toutes les images du site depuis Cloudinary
 * Retourne les URLs directement indexées par leur ID de slot
 */
export async function getImages(): Promise<SiteImages> {
  const cloudinaryImages = await getAllCloudinaryImages();

  return {
    // UI
    "ui-logo-club": cloudinaryImages["ui-logo-club"] || "/images/placeholder.svg",
    "ui-hero-accueil": cloudinaryImages["ui-hero-accueil"] || "/images/placeholder.svg",
    "ui-background-contact": cloudinaryImages["ui-background-contact"] || "/images/placeholder.svg",
    "ui-club-histoire": cloudinaryImages["ui-club-histoire"] || "/images/placeholder.svg",
    "ui-trophees": cloudinaryImages["ui-trophees"] || "/images/placeholder.svg",

    // Combat
    "combat-gala-principal": cloudinaryImages["combat-gala-principal"] || "/images/placeholder.svg",
    "combat-champion-1": cloudinaryImages["combat-champion-1"] || "/images/placeholder.svg",
    "combat-champion-2": cloudinaryImages["combat-champion-2"] || "/images/placeholder.svg",

    // Entraînement
    "entrainement-groupe-1": cloudinaryImages["entrainement-groupe-1"] || "/images/placeholder.svg",
    "entrainement-coach": cloudinaryImages["entrainement-coach"] || "/images/placeholder.svg",
    "entrainement-technique": cloudinaryImages["entrainement-technique"] || "/images/placeholder.svg",

    // Galerie Palmarès
    "palmares-trophees-1": cloudinaryImages["palmares-trophees-1"] || "/images/placeholder.svg",
    "palmares-trophees-2": cloudinaryImages["palmares-trophees-2"] || "/images/placeholder.svg",
    "palmares-trophees-3": cloudinaryImages["palmares-trophees-3"] || "/images/placeholder.svg",
    "palmares-medailles-1": cloudinaryImages["palmares-medailles-1"] || "/images/placeholder.svg",

    // Galerie Salle
    "salle-vue-generale": cloudinaryImages["salle-vue-generale"] || "/images/placeholder.svg",
    "salle-sacs": cloudinaryImages["salle-sacs"] || "/images/placeholder.svg",
    "salle-ring": cloudinaryImages["salle-ring"] || "/images/placeholder.svg",
    "salle-entrainement-1": cloudinaryImages["salle-entrainement-1"] || "/images/placeholder.svg",

    // Galerie Ring
    "ring-combat-1": cloudinaryImages["ring-combat-1"] || "/images/placeholder.svg",
    "ring-combat-2": cloudinaryImages["ring-combat-2"] || "/images/placeholder.svg",
    "ring-victoire-1": cloudinaryImages["ring-victoire-1"] || "/images/placeholder.svg",
    "ring-podium-1": cloudinaryImages["ring-podium-1"] || "/images/placeholder.svg",
  };
}
