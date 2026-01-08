import { getImages } from "@/lib/get-images";
import { GalerieClient } from "./GalerieClient";

export default async function GaleriePage() {
  const images = await getImages();

  return <GalerieClient images={images} />;
}
