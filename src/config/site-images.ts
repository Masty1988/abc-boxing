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
  {
    id: "ui-trophees",
    label: "Photo Trophées/Palmarès",
    description: "Photo des trophées, ceintures et médailles du club",
    category: "UI",
    width: 1200,
    height: 800,
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

  // =============================================================================
  // GALERIE PALMARÈS (Page Club)
  // =============================================================================
  {
    id: "palmares-trophees-1",
    label: "Palmarès - Trophées #1",
    description: "Photo des trophées du club",
    category: "AUTRE",
    width: 1200,
    height: 900,
  },
  {
    id: "palmares-trophees-2",
    label: "Palmarès - Trophées #2",
    description: "Photo des trophées du club",
    category: "AUTRE",
    width: 1200,
    height: 900,
  },
  {
    id: "palmares-trophees-3",
    label: "Palmarès - Trophées #3",
    description: "Photo des trophées du club",
    category: "AUTRE",
    width: 1200,
    height: 900,
  },
  {
    id: "palmares-medailles-1",
    label: "Palmarès - Médailles",
    description: "Photo des médailles du club",
    category: "AUTRE",
    width: 1200,
    height: 900,
  },

  // =============================================================================
  // GALERIE SALLE (Page Club)
  // =============================================================================
  {
    id: "salle-vue-generale",
    label: "Salle - Vue Générale",
    description: "Vue d'ensemble de la salle d'entraînement",
    category: "ENTRAINEMENT",
    width: 1200,
    height: 900,
  },
  {
    id: "salle-sacs",
    label: "Salle - Sacs de Frappe",
    description: "Zone des sacs de frappe",
    category: "ENTRAINEMENT",
    width: 1200,
    height: 900,
  },
  {
    id: "salle-ring",
    label: "Salle - Ring",
    description: "Le ring de la salle",
    category: "ENTRAINEMENT",
    width: 1200,
    height: 900,
  },
  {
    id: "salle-entrainement-1",
    label: "Salle - Entraînement",
    description: "Photo d'entraînement dans la salle",
    category: "ENTRAINEMENT",
    width: 1200,
    height: 900,
  },

  // =============================================================================
  // GALERIE RING / COMBATS (Page Club)
  // =============================================================================
  {
    id: "ring-combat-1",
    label: "Ring - Combat #1",
    description: "Photo de combat sur le ring",
    category: "COMBAT",
    width: 1200,
    height: 900,
  },
  {
    id: "ring-combat-2",
    label: "Ring - Combat #2",
    description: "Photo de combat sur le ring",
    category: "COMBAT",
    width: 1200,
    height: 900,
  },
  {
    id: "ring-victoire-1",
    label: "Ring - Victoire",
    description: "Photo de victoire/célébration",
    category: "COMBAT",
    width: 1200,
    height: 900,
  },
  {
    id: "ring-podium-1",
    label: "Ring - Podium",
    description: "Photo sur le podium",
    category: "COMBAT",
    width: 1200,
    height: 900,
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
