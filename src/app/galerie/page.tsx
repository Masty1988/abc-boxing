import type { Metadata } from "next";
import { GalerieClient } from "./GalerieClient";

export const metadata: Metadata = {
  title: "Galerie & Palmarès - ABC Boxing La Rochelle",
  description: "Découvrez notre galerie photo, l'histoire du club ABC Boxing et le palmarès de nos champions. Plus de 15 ans de boxe à La Rochelle.",
  openGraph: {
    title: "Galerie ABC Boxing",
    description: "Photos et palmarès du club de boxe de La Rochelle",
  },
};

export default async function GaleriePage() {
  return <GalerieClient />;
}
