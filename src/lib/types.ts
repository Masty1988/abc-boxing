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
