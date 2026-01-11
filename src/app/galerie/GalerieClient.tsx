"use client";

import { useState } from "react";
import { Card, OptimizedImage } from "@/components/ui";
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

      {/* Timeline - Cards style réseaux sociaux */}
      <section className="px-6 py-8">
        <div className="space-y-6 max-w-2xl mx-auto">
          {timelineEvents.map((event, index) => (
            <Card
              key={index}
              className={`overflow-hidden ${
                event.highlight
                  ? "border-red-500/50 shadow-lg shadow-red-500/20"
                  : ""
              }`}
              hover={false}
            >
              {/* Photo en tête */}
              {event.imagePath && (
                <div className="relative h-56 overflow-hidden">
                  <OptimizedImage
                    src={event.imagePath}
                    alt={`${event.title} - ${event.year}`}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Badge année en overlay */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-black shadow-lg backdrop-blur-sm ${
                        event.highlight
                          ? "bg-red-500 text-white"
                          : "bg-white/20 text-white border-2 border-white/30"
                      }`}
                    >
                      {event.year}
                    </div>
                  </div>
                </div>
              )}

              {/* Contenu de la card */}
              <div className="p-5">
                {/* Badges */}
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

                {/* Titre */}
                <h3 className="text-xl font-bold mb-3 text-white">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Indicateur fin de timeline */}
        <div className="flex flex-col items-center mt-12 gap-3">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-2xl">🥊</span>
          </div>
          <p className="text-red-400 text-sm font-bold uppercase tracking-wider">
            À suivre...
          </p>
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
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>📰</span>
          Ils parlent de nous
        </h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Depuis toujours, ABC Boxing forme des champions. Découvrez comment la presse locale et nationale a suivi nos exploits, nos événements et nos athlètes au fil des années.
        </p>
        <Card
          className="overflow-hidden cursor-pointer group"
          hover={true}
          onClick={() => openLightbox(0)}
        >
          <div className="h-48 relative">
            <OptimizedImage
              src={pressArticles[0].image}
              alt="Revue de presse ABC Boxing"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="bg-blue-500/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <span className="text-2xl">📰</span>
                <span className="font-bold text-white">
                  +{pressArticles.length} articles
                </span>
              </div>
            </div>
          </div>
        </Card>
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
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-2xl z-10 backdrop-blur-sm"
          >
            ✕
          </button>

          {/* Compteur */}
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-bold z-10 backdrop-blur-sm">
            {selectedArticle + 1} / {pressArticles.length}
          </div>

          {/* Titre */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg bg-black/70 text-white text-lg font-bold z-10 backdrop-blur-sm">
            Revue de Presse
          </div>

          {/* Navigation Précédent */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevArticle();
            }}
            className="absolute left-4 w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-3xl z-10 backdrop-blur-sm transition-all hover:scale-110"
          >
            ←
          </button>

          {/* Conteneur Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image principale */}
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              <OptimizedImage
                src={pressArticles[selectedArticle].image}
                alt={pressArticles[selectedArticle].caption}
                fill
                className="object-contain"
              />
            </div>

            {/* Légende */}
            <p className="mt-4 px-4 py-2 bg-black/70 text-white text-sm rounded-lg backdrop-blur-sm">
              {pressArticles[selectedArticle].caption}
            </p>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-6 overflow-x-auto pb-2 max-w-full px-4">
              {pressArticles.map((article, idx) => (
                <button
                  key={article.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedArticle(idx);
                  }}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                    idx === selectedArticle
                      ? "ring-4 ring-blue-500 scale-110"
                      : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <OptimizedImage
                    src={article.image}
                    alt={article.caption}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Suivant */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextArticle();
            }}
            className="absolute right-4 w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-3xl z-10 backdrop-blur-sm transition-all hover:scale-110"
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
                      <OptimizedImage
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
