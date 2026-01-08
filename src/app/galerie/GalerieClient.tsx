"use client";

import Image from "next/image";
import { Card } from "@/components/ui";
import { STAFF } from "@/lib/constants";
import type { SiteImages } from "@/lib/get-images";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2003",
    title: "Fondation du club",
    description: "Le club ABC Boxing a été créé en mars 2003 par Jean-Michel, président fondateur, et Tony Herpin, moniteur. Dès ses débuts, le club s'inscrit dans une dynamique de développement et de transmission autour des sports de combat.",
  },
  {
    year: "2005",
    title: "Nouvelle direction",
    description: "En avril 2005, le club est repris par Vincent, moniteur, et Nathalie Joly, présidente. Ensemble, ils donnent une nouvelle impulsion à ABC Boxing en structurant l'association et en misant fortement sur la formation des encadrants.",
  },
  {
    year: "2011",
    title: "Titre Mondial",
    description: "ABC Boxing brille sur la scène internationale avec Mélanie Lete, qui décroche les titres de Championne de France et Championne du Monde. Un exploit historique pour le club rochelais.",
    highlight: true,
  },
  {
    year: "2017",
    title: "Création section K-1",
    description: "Dans une volonté d'évolution et d'ouverture, la section Kick Boxing / K-1 est créée. Elle est aujourd'hui encadrée par Maya, Jean-Sébastien et Vincent, contribuant à la diversification et au dynamisme sportif du club.",
  },
  {
    year: "2024",
    title: "Championnat de France",
    description: "Le club se déplace en Guadeloupe pour les Championnats de France, où Cali Joly obtient une belle 4ᵉ place nationale. ABC Boxing continue de briller au niveau national.",
    highlight: true,
  },
  {
    year: "Aujourd'hui",
    title: "Un club en mouvement",
    description: "Fort de son histoire, de ses valeurs et de son engagement, ABC Boxing continue de former, d'encadrer et d'accompagner ses licenciés, du loisir à la compétition, avec passion et ambition.",
  },
];

interface GalerieClientProps {
  images: SiteImages;
}

export function GalerieClient({ images }: GalerieClientProps) {
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
                  {event.highlight && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold mb-3">
                      🏆 Moment clé
                    </div>
                  )}
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

              {/* Espace vide de l'autre côté */}
              <div className="w-[calc(50%-2rem)]" />
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
          {STAFF.map((member, index) => (
            <div key={index} className="text-center">
              {/* Photo en rond */}
              <div className="relative w-28 h-28 mx-auto mb-3">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 blur-lg" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-red-500/40 shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
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
          ))}
        </div>
      </section>
    </div>
  );
}
