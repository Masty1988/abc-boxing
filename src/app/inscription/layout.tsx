import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription - ABC Boxing La Rochelle",
  description: "Inscrivez-vous au club ABC Boxing La Rochelle. Tarifs, horaires et formulaire d'inscription pour la Boxe Française et le Kickboxing.",
  openGraph: {
    title: "Inscription ABC Boxing",
    description: "Rejoignez le club de boxe de La Rochelle",
  },
};

export default function InscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
