import { Tarif, Horaire, StaffMember, ClubStats } from "./types";

// =============================================================================
// CONTACT
// =============================================================================
export const CONTACT = {
  phone: "06 32 72 85 41", 
  phoneLink: "tel:+33632728541",
  email: "contact@abcboxing.fr",
  place: "Gymnase Descartes",
  address: "101, Avenue de bourgorne",
  city: "La Rochelle",
  postalCode: "17000",
  fullAddress: "Gymnase Descartes, 101, Avenue de bourgorne, 17000 La Rochelle",
};

// =============================================================================
// TARIFS
// =============================================================================
export const TARIFS: Tarif[] = [
  // ENFANTS
  {
    id: "enfant-bf-loisir",
    discipline: "Boxe Française",
    category: "enfants",
    type: "loisir",
    name: "Boxe Française Loisir",
    price: 105,
    features: ["1 cours/semaine", "Vendredi 19h30-21h", "Assurance incluse"],
  },
  {
    id: "enfant-bf-competition",
    discipline: "Boxe Française",
    category: "enfants",
    type: "competition",
    name: "Boxe Française Compétition",
    price: 125,
    features: ["Cours illimités", "Licence FFSavate", "Passeport inclus", "Accès compétitions"],
  },

  // ADULTES LOISIR
  {
    id: "adulte-loisir",
    discipline: "Boxe Française & Kickboxing",
    category: "adultes",
    type: "loisir",
    name: "Boxe Française & Kickboxing",
    price: 145,
    features: ["Accès BF + Kickboxing", "Cours illimités", "Assurance incluse"],
  },

  // ADULTES COMPÉTITION
  {
    id: "adulte-bf-competition",
    discipline: "Boxe Française",
    category: "adultes",
    type: "competition",
    name: "Boxe Française",
    price: 180,
    features: ["Cours illimités", "Licence FFSavate", "Passeport inclus", "Prépa compétition"],
  },
  {
    id: "adulte-k1-competition",
    discipline: "Kickboxing",
    category: "adultes",
    type: "competition",
    name: "Kickboxing K1",
    price: 200,
    features: ["Cours illimités", "Licence FFKMDA", "Passeport inclus", "Prépa compétition"],
  },
  {
    id: "adulte-bf-k1-competition",
    discipline: "bf_k1",
    category: "adultes",
    type: "competition",
    name: "BF + Kickboxing",
    price: 250,
    features: ["Accès tous les cours", "Double licence", "Passeports inclus", "Prépa compétition"],
  },
];

// =============================================================================
// HORAIRES
// =============================================================================
export const HORAIRES: Horaire[] = [
  { jour: "Mardi", cours: "Boxe Française", discipline: "Boxe Française", heures: "20h - 22h" },
  { jour: "Mercredi", cours: "Cardio Compétition", discipline: "bf_k1", heures: "20h - 21h" },
  { jour: "Jeudi", cours: "Kickboxing K1", discipline: "Kickboxing", heures: "20h - 22h" },
  { jour: "Vendredi", cours: "BF Enfants", discipline: "Boxe Française", heures: "19h30 - 21h", category: "enfants" },
  { jour: "Vendredi", cours: "BF Adultes", discipline: "Boxe Française", heures: "19h30 - 21h", category: "adultes" },
  { jour: "Vendredi", cours: "Compétition", discipline: "bf_k1", heures: "21h - 22h" },
];

// =============================================================================
// IMAGES
// =============================================================================
export const IMAGES = {
  logo: "/images/abc-boxing.jpg",
  hero: "/images/hero.jpg",
  choc: "/images/choc.jpg",
  kick: "/images/kick.jpg",
  trophee: "/images/trophee.jpg",
  engage: "/images/engage.jpg",
  engage2: "/images/engage2.jpg",
  fede: "/images/fede.jpg",
  officiel: "/images/officiel.jpg",
} as const;

// =============================================================================
// STAFF & STATS
// =============================================================================
export const STAFF: StaffMember[] = [
  { name: "Vincent", role: "Coach / Arbitre Officiel", image: IMAGES.officiel },
  { name: "Vanessa", role: "Préparateur physique", image: IMAGES.fede },
  { name: "Nathalie", role: "Présidente", image: IMAGES.engage2 },
  { name: "Maya", role: "Entraîneur Kickboxing", image: IMAGES.engage },
];

export const CLUB_STATS: ClubStats[] = [
  { label: "Titres Nationaux", value: "12" },
  { label: "Champions Régionaux", value: "34" },
  { label: "Années d'existence", value: "15" },
  { label: "Adhérents actifs", value: "120+" },
];

// =============================================================================
// NAVIGATION
// =============================================================================
export const NAV_ITEMS = [
  { id: "home", label: "Accueil", href: "/" },
  { id: "inscription", label: "Inscription", href: "/inscription" },
  { id: "club", label: "Club", href: "/club" },
  { id: "galerie", label: "Histoire", href: "/galerie" },
  { id: "disciplines", label: "Disciplines", href: "/disciplines" },
] as const;
