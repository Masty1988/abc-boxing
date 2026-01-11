"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui";
import { STAFF } from "@/lib/constants";
import type { SiteImages } from "@/lib/get-images";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
  imagePath?: string; // Chemin vers l'image (ex: /images/timeline/fondation_2003.jpg)
  pressArticles?: string[]; // Articles de presse associés
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2003",
    title: "Fondation du club",
    description: "Le club ABC Boxing a été créé en mars 2003 par Jean-Michel, président fondateur, et Tony Herpin, moniteur. Dès ses débuts, le club s'inscrit dans une dynamique de développement et de transmission autour des sports de combat.",
    imagePath: "/images/timeline/fondation_2003.jpg",
  },
  {
    year: "2005",
    title: "Nouvelle direction",
    description: "En avril 2005, le club est repris par Vincent, moniteur, et Nathalie Joly, présidente. Ensemble, ils donnent une nouvelle impulsion à ABC Boxing en structurant l'association et en misant fortement sur la formation des encadrants.",
    imagePath: "/images/timeline/direction_2005.jpg",
  },
  {
    year: "2011",
    title: "Titre Mondial",
    description: "ABC Boxing brille sur la scène internationale avec Mélanie Lete, qui décroche les titres de Championne de France et Championne du Monde. Un exploit historique pour le club rochelais.",
    highlight: true,
    imagePath: "/images/timeline/mondial_2011.jpg",
    pressArticles: ["/images/presse/histoire-journaux-2.jpg", "/images/presse/histoire-journaux-3.jpg"],
  },
  {
    year: "2017",
    title: "Création section K-1",
    description: "Dans une volonté d'évolution et d'ouverture, la section Kick Boxing / K-1 est créée. Elle est aujourd'hui encadrée par Maya, Jean-Sébastien et Vincent, contribuant à la diversification et au dynamisme sportif du club.",
    imagePath: "/images/timeline/k1_2017.jpg",
  },
  {
    year: "2024",
    title: "Championnat de France",
    description: "Le club se déplace en Guadeloupe pour les Championnats de France, où Cali Joly obtient une belle 4ᵉ place nationale. ABC Boxing continue de briller au niveau national.",
    highlight: true,
    imagePath: "/images/timeline/france_2024.jpg",
  },
  {
    year: "Aujourd'hui",
    title: "Un club en mouvement",
    description: "Fort de son histoire, de ses valeurs et de son engagement, ABC Boxing continue de former, d'encadrer et d'accompagner ses licenciés, du loisir à la compétition, avec passion et ambition.",
    imagePath: "/images/timeline/aujourdhui.jpg",
  },
];

interface GalerieClientProps {
  images: SiteImages;
}

// Articles de presse (tous les 8)
const pressArticles = [
  { id: 1, image: "/images/presse/histoire-journaux-1.jpg", caption: "Événement club" },
  { id: 2, image: "/images/presse/histoire-journaux-2.jpg", caption: "Mélanie Championne du Monde (1/2)" },
  { id: 3, image: "/images/presse/histoire-journaux-3.jpg", caption: "Mélanie Championne du Monde (2/2)" },
  { id: 4, image: "/images/presse/histoire-journaux-4.jpg", caption: "Jimmy Morisseau (1/2)" },
  { id: 5, image: "/images/presse/histoire-journaux-5.jpg", caption: "Jimmy Morisseau (2/2)" },
  { id: 6, image: "/images/presse/histoire-journaux-6.jpg", caption: "Stage Brighton" },
  { id: 7, image: "/images/presse/histoire-journaux-7.jpg", caption: "Caroline Bouyer" },
  { id: 8, image: "/images/presse/histoire-journaux-8.jpg", caption: "Cali Joly" },
];

export function GalerieClient({ images }: GalerieClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedArticle(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextArticle = () => {
    setSelectedArticle((prev) => (prev + 1) % pressArticles.length);
  };

  const prevArticle = () => {
    setSelectedArticle((prev) => (prev - 1 + pressArticles.length) % pressArticles.length);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24">
      {/* Header */}
      <div className="h-32 bg-gradient-to-b from-red-900/30 to-transparent flex items-end px-6 pb-4">
        <h1 className="text-3xl font-black">Notre Histoire</h1>
      </div>

      {/* Introduction */}
      <section className="px-6 py-6">
        <p className="text-gray-300 text-center italic">
          Plus de 20 ans de passion, de combats et de transmission
        </p>
      </section>

      {/* Timeline */}
      <section className="px-6 py-8 relative">
        {/* Ligne verticale centrale */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-red-600 to-red-500 transform -translate-x-1/2" />

        {/* Événements */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Card de l'événement */}
              <div className="w-[calc(50%-2rem)]">
                <Card
                  className={`p-5 ${
                    event.highlight
                      ? "bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/50"
                      : ""
                  }`}
                  hover={false}
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.highlight && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">
                        🏆 Moment clé
                      </div>
                    )}
                    {event.pressArticles && event.pressArticles.length > 0 && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold">
                        📰 Revue de presse
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </Card>
              </div>

              {/* Point central avec année */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                {/* Point */}
                <div
                  className={`w-4 h-4 rounded-full border-4 ${
                    event.highlight
                      ? "bg-red-500 border-red-300 shadow-lg shadow-red-500/50"
                      : "bg-[#121212] border-red-500"
                  } z-10`}
                />
                {/* Année */}
                <div
                  className={`mt-2 px-3 py-1 rounded-full text-sm font-black ${
                    event.highlight
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-white/10 text-red-400"
                  }`}
                >
                  {event.year}
                </div>
              </div>

              {/* Photo de l'événement de l'autre côté */}
              <div className="w-[calc(50%-2rem)]">
                {event.imagePath && (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={event.imagePath}
                      alt={`${event.title} - ${event.year}`}
                      fill
                      className="object-cover"
                    />
                    {/* Overlay subtle pour le style */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Flèche en bas de la timeline */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-8 flex flex-col items-center">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-500" />
          <div className="mt-2 text-red-400 text-xs font-bold uppercase tracking-wider">
            À suivre...
          </div>
        </div>
      </section>

      {/* Citation finale */}
      <section className="px-6 py-12 mt-16">
        <Card className="p-8 text-center bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
          <div className="text-4xl mb-4">🥊</div>
          <p className="text-lg font-bold text-white mb-2">
            &quot;L&apos;histoire s&apos;écrit chaque jour sur le ring&quot;
          </p>
          <p className="text-sm text-gray-400">
            Rejoignez l&apos;aventure ABC Boxing La Rochelle
          </p>
        </Card>
      </section>

      {/* Section Revue de Presse */}
      <section className="px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white mb-2 flex items-center justify-center gap-2">
            <span>📰</span>
            Ils parlent de nous
          </h2>
          <p className="text-gray-400 text-sm">
            Articles de presse et couverture médiatique
          </p>
        </div>

        {/* Carousel horizontal scrollable */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6">
          <div className="flex gap-4 min-w-max">
            {pressArticles.map((article, index) => (
              <button
                key={article.id}
                onClick={() => openLightbox(index)}
                className="flex-shrink-0 w-48 group cursor-pointer"
              >
                <div className="relative h-64 rounded-lg overflow-hidden border-2 border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20">
                  <Image
                    src={article.image}
                    alt={article.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      🔍
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">{article.caption}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Note informative */}
        <p className="text-xs text-gray-500 text-center mt-6 italic">
          Cliquez sur un article pour l&apos;agrandir
        </p>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Bouton Fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl z-10"
          >
            ✕
          </button>

          {/* Compteur */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-bold z-10">
            {selectedArticle + 1} / {pressArticles.length}
          </div>

          {/* Navigation Précédent */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevArticle();
            }}
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl z-10"
          >
            ←
          </button>

          {/* Image agrandie */}
          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={pressArticles[selectedArticle].image}
                alt={pressArticles[selectedArticle].caption}
                fill
                className="object-contain"
              />
            </div>
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/70 text-white text-sm rounded-lg">
              {pressArticles[selectedArticle].caption}
            </p>
          </div>

          {/* Navigation Suivant */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextArticle();
            }}
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl z-10"
          >
            →
          </button>
        </div>
      )}

      {/* Section Staff */}
      <section className="px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-white mb-2">
            L&apos;Équipe ABC Boxing
          </h2>
          <p className="text-gray-400 text-sm">
            Passionnés et expérimentés, ils vous accompagnent dans votre progression
          </p>
        </div>

        <div className="flex justify-center gap-8 flex-wrap">
          {STAFF.map((member, index) => {
            // Chemin vers la photo staff (sera /images/staff_vincent.jpg, etc.)
            const staffPhotoPath = `/images/staff_${member.name.toLowerCase()}.jpg`;
            const hasPhoto = false; // 🔧 Mettre à true quand les photos seront uploadées

            return (
              <div key={index} className="text-center">
                {/* Photo en rond avec fallback initiales */}
                <div className="relative w-28 h-28 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 blur-lg" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-red-500/40 shadow-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                    {hasPhoto ? (
                      <Image
                        src={staffPhotoPath}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-black text-white">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Nom */}
                <h3 className="text-lg font-bold text-white mb-1">
                  {member.name}
                </h3>

                {/* Rôle */}
                <p className="text-red-400 text-xs font-medium">
                  {member.role}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
