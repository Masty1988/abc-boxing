import type { Metadata } from "next";
import { getImages } from "@/lib/get-images";
import { ClubClient } from "./ClubClient";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Le Club - ABC Boxing La Rochelle",
  description: "Découvrez l'histoire d'ABC Boxing La Rochelle, nos coachs diplômés, notre palmarès et notre salle d'entraînement. Club affilié FFSBFDA et FFKMDA.",
  openGraph: {
    title: "Le Club ABC Boxing",
    description: "Histoire, coachs et palmarès du club de boxe de La Rochelle",
  },
};

export default async function ClubPage() {
  const IMAGES = await getImages();

  // Récupérer le nombre total d'adhérents depuis la base de données
  const totalAdherents = await prisma.adherent.count();

  return <ClubClient images={IMAGES} totalAdherents={totalAdherents} />;
}
