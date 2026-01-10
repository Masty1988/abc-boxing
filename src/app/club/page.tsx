import { getImages } from "@/lib/get-images";
import { ClubClient } from "./ClubClient";
import { prisma } from "@/lib/prisma";

export default async function ClubPage() {
  const IMAGES = await getImages();

  // Récupérer le nombre total d'adhérents depuis la base de données
  const totalAdherents = await prisma.adherent.count();

  return <ClubClient images={IMAGES} totalAdherents={totalAdherents} />;
}
