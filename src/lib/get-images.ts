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
    "ui-logo-club": cloudinaryImages["ui-logo-club"] || "/images/placeholder.jpg",
    "ui-hero-accueil": cloudinaryImages["ui-hero-accueil"] || "/images/placeholder.jpg",
    "ui-background-contact": cloudinaryImages["ui-background-contact"] || "/images/placeholder.jpg",
    "ui-club-histoire": cloudinaryImages["ui-club-histoire"] || "/images/placeholder.jpg",
    "ui-trophees": cloudinaryImages["ui-trophees"] || "/images/placeholder.jpg",

    // Combat
    "combat-gala-principal": cloudinaryImages["combat-gala-principal"] || "/images/placeholder.jpg",
    "combat-champion-1": cloudinaryImages["combat-champion-1"] || "/images/placeholder.jpg",
    "combat-champion-2": cloudinaryImages["combat-champion-2"] || "/images/placeholder.jpg",

    // Entraînement
    "entrainement-groupe-1": cloudinaryImages["entrainement-groupe-1"] || "/images/placeholder.jpg",
    "entrainement-coach": cloudinaryImages["entrainement-coach"] || "/images/placeholder.jpg",
    "entrainement-technique": cloudinaryImages["entrainement-technique"] || "/images/placeholder.jpg",

    // Galerie Palmarès
    "palmares-trophees-1": cloudinaryImages["palmares-trophees-1"] || "/images/placeholder.jpg",
    "palmares-trophees-2": cloudinaryImages["palmares-trophees-2"] || "/images/placeholder.jpg",
    "palmares-trophees-3": cloudinaryImages["palmares-trophees-3"] || "/images/placeholder.jpg",
    "palmares-medailles-1": cloudinaryImages["palmares-medailles-1"] || "/images/placeholder.jpg",

    // Galerie Salle
    "salle-vue-generale": cloudinaryImages["salle-vue-generale"] || "/images/placeholder.jpg",
    "salle-sacs": cloudinaryImages["salle-sacs"] || "/images/placeholder.jpg",
    "salle-ring": cloudinaryImages["salle-ring"] || "/images/placeholder.jpg",
    "salle-entrainement-1": cloudinaryImages["salle-entrainement-1"] || "/images/placeholder.jpg",

    // Galerie Ring
    "ring-combat-1": cloudinaryImages["ring-combat-1"] || "/images/placeholder.jpg",
    "ring-combat-2": cloudinaryImages["ring-combat-2"] || "/images/placeholder.jpg",
    "ring-victoire-1": cloudinaryImages["ring-victoire-1"] || "/images/placeholder.jpg",
    "ring-podium-1": cloudinaryImages["ring-podium-1"] || "/images/placeholder.jpg",
  };
}
