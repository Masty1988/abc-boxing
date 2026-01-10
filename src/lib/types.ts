// Types pour ABC Boxing

export type PageId = "home" | "inscription" | "club" | "actualites" | "galerie";

export type Discipline = "Boxe Française" | "Kickboxing" | "Boxe Française & Kickboxing" | "bf_k1";
export type Category = "adultes" | "enfants";
export type FormulaType = "loisir" | "competition";

export interface Tarif {
  id: string;
  discipline: Discipline;
  category: Category;
  type: FormulaType;
  name: string;
  price: number;
  features: string[];
}

export interface Horaire {
  jour: string;
  cours: string;
  discipline: Discipline;
  heures: string;
  category?: Category;
}

export interface Post {
  id: number;
  pinned?: boolean;
  tag: string;
  tagColor: "default" | "success" | "warning" | "danger" | "info";
  title: string;
  excerpt: string;
  image: string;
  date: string;
  likes: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  category: string;
  title: string;
}

export interface Member {
  id: number;
  name: string;
  formula: string;
  status: "paid" | "pending";
  method: "stripe" | "cash" | null;
  date: string;
  avatar: string;
}

export interface StaffMember {
  name: string;
  role: string;
  image: string;
}

export interface ClubStats {
  label: string;
  value: string;
}

export interface InscriptionData {
  // Informations personnelles
  prenom: string;
  nom: string;
  dateNaissance: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;

  // Informations formule
  category: Category;
  tarifId: string;
  tarifName: string;
  price: number;

  // Informations responsable légal (si enfant)
  responsableNom?: string;
  responsablePrenom?: string;
  responsableTelephone?: string;
  responsableEmail?: string;
}

export interface Event {
  id: string;
  titre: string;
  description: string;
  date: Date | string;
  lieu?: string | null;
  prix?: number | null;
  imageUrl?: string | null;
  lienReservation?: string | null;
  publie: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
