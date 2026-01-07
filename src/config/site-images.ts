// Configuration des emplacements d'images éditables du site
// Ces slots définissent les images que l'admin peut REMPLACER (pas ajouter)

export interface ImageSlot {
  id: string; // Clé unique, correspond au public_id Cloudinary
  label: string; // Nom affiché dans l'admin
  description: string; // Description pour l'admin
  category: "UI" | "COMBAT" | "ENTRAINEMENT" | "AUTRE";
  width: number; // Largeur recommandée
  height: number; // Hauteur recommandée
}

export const EDITABLE_IMAGES: ImageSlot[] = [
  // =============================================================================
  // IMAGES UI (Interface du site)
  // =============================================================================
  {
    id: "ui-hero-accueil",
    label: "Hero Page d'Accueil",
    description: "Image de fond principale sur la page d'accueil",
    category: "UI",
    width: 1920,
    height: 1080,
  },
  {
    id: "ui-background-contact",
    label: "Background Section Contact",
    description: "Image de fond derrière le formulaire de contact",
    category: "UI",
    width: 1920,
    height: 1080,
  },
  {
    id: "ui-club-histoire",
    label: "Photo Histoire du Club",
    description: "Image illustrant l'histoire du club",
    category: "UI",
    width: 800,
    height: 600,
  },
  {
    id: "ui-logo-club",
    label: "Logo du Club",
    description: "Logo ABC Boxing (affiché dans le header)",
    category: "UI",
    width: 400,
    height: 400,
  },

  // =============================================================================
  // IMAGES COMBAT (Photos de gala/compétitions)
  // =============================================================================
  {
    id: "combat-gala-principal",
    label: "Photo Gala Principale",
    description: "Photo mise en avant pour le prochain gala",
    category: "COMBAT",
    width: 1200,
    height: 800,
  },
  {
    id: "combat-champion-1",
    label: "Champion #1",
    description: "Photo d'un combattant champion du club",
    category: "COMBAT",
    width: 600,
    height: 800,
  },
  {
    id: "combat-champion-2",
    label: "Champion #2",
    description: "Photo d'un combattant champion du club",
    category: "COMBAT",
    width: 600,
    height: 800,
  },

  // =============================================================================
  // IMAGES ENTRAINEMENT (Ambiance club)
  // =============================================================================
  {
    id: "entrainement-groupe-1",
    label: "Entrainement Groupe #1",
    description: "Photo d'entraînement collectif",
    category: "ENTRAINEMENT",
    width: 1200,
    height: 800,
  },
  {
    id: "entrainement-coach",
    label: "Photo Coach Principal",
    description: "Portrait du coach principal en action",
    category: "ENTRAINEMENT",
    width: 800,
    height: 800,
  },
  {
    id: "entrainement-technique",
    label: "Technique BF/K1",
    description: "Photo illustrant une technique de boxe",
    category: "ENTRAINEMENT",
    width: 1200,
    height: 800,
  },
];

// Helper pour récupérer un slot par son ID
export function getSlotById(id: string): ImageSlot | undefined {
  return EDITABLE_IMAGES.find((slot) => slot.id === id);
}

// Helper pour récupérer tous les slots d'une catégorie
export function getSlotsByCategory(category: ImageSlot["category"]): ImageSlot[] {
  return EDITABLE_IMAGES.filter((slot) => slot.category === category);
}
