"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui";
import { IconTrophy, IconMapPin } from "@/components/icons";
import { STAFF, CLUB_STATS, CONTACT } from "@/lib/constants";
import type { SiteImages } from "@/lib/get-images";

interface ClubClientProps {
  images: SiteImages;
  totalAdherents: number;
}

// Photos palmarès (Cloudinary slots à créer)
const PALMARES_PHOTOS = [
  "palmares-trophees-1",
  "palmares-trophees-2",
  "palmares-trophees-3",
  "palmares-medailles-1",
];

// Photos salle d'entraînement
const SALLE_PHOTOS = [
  "salle-vue-generale",
  "salle-sacs",
  "salle-ring",
  "salle-entrainement-1",
];

// Photos ring / combats
const RING_PHOTOS = [
  "ring-combat-1",
  "ring-combat-2",
  "ring-victoire-1",
  "ring-podium-1",
];

export function ClubClient({ images, totalAdherents }: ClubClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPhotos, setModalPhotos] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openModal = (photos: string[], title: string) => {
    setModalPhotos(photos);
    setModalTitle(title);
    setCurrentPhotoIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % modalPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(
      (prev) => (prev - 1 + modalPhotos.length) % modalPhotos.length
    );
  };

  // Mise à jour des stats avec le nombre réel d'adhérents
  const updatedStats = CLUB_STATS.map((stat) => {
    if (stat.label === "Adhérents actifs") {
      return { ...stat, value: `${totalAdherents}` };
    }
    return stat;
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24">
      <div className="h-32 bg-gradient-to-b from-red-900/30 to-transparent flex items-end px-6 pb-4">
        <h1 className="text-3xl font-black">L&apos;Esprit Club</h1>
      </div>

      {/* Mot de la Présidente */}
      <section className="px-6 py-8">
        <Card className="p-6" hover={false}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-red-500/20 relative">
              <Image
                src={images["ui-club-histoire"]}
                alt="Présidente"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Le Mot de la Présidente</h3>
              <p className="text-gray-400 italic leading-relaxed">
                &quot;Bienvenue à ABC Boxing La Rochelle. Ici, on forme des
                champions, mais surtout des humains. Le respect, le dépassement
                de soi et la solidarité sont nos valeurs fondamentales.&quot;
              </p>
              <p className="text-sm text-red-400 mt-3 font-medium">
                — Nathalie, Présidente ABC Boxing
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Palmarès */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <IconTrophy />
          Notre Palmarès
        </h2>

        {/* Card galerie avec compteur */}
        <Card
          className="overflow-hidden mb-4 cursor-pointer group"
          hover={true}
          onClick={() => openModal(PALMARES_PHOTOS, "Notre Palmarès")}
        >
          <div className="h-48 relative">
            <Image
              src={images["ui-trophees"]}
              alt="Trophées"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay avec compteur */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="bg-red-500/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <span className="text-2xl">📸</span>
                <span className="font-bold text-white">
                  +{PALMARES_PHOTOS.length} photos
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {updatedStats.map((s, i) => (
            <Card key={i} className="p-4 text-center">
              <div className="text-3xl font-black text-red-500">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* La Salle */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4">La Salle</h2>
        <Card
          className="overflow-hidden cursor-pointer group"
          hover={true}
          onClick={() => openModal(SALLE_PHOTOS, "Notre Salle d'Entraînement")}
        >
          <div className="h-48 relative">
            <Image
              src={images["entrainement-groupe-1"]}
              alt="Salle d'entraînement"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="bg-red-500/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <span className="text-2xl">🏋️</span>
                <span className="font-bold text-white">
                  +{SALLE_PHOTOS.length} photos
                </span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Le Ring */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4">Le Ring</h2>
        <Card
          className="overflow-hidden cursor-pointer group"
          hover={true}
          onClick={() => openModal(RING_PHOTOS, "Nos Combats")}
        >
          <div className="h-48 relative">
            <Image
              src={images["combat-champion-1"]}
              alt="Ring de combat"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="bg-red-500/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <span className="text-2xl">🥊</span>
                <span className="font-bold text-white">
                  +{RING_PHOTOS.length} photos
                </span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* L'Équipe - Style Timeline */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-bold mb-6 text-center">L&apos;Équipe Encadrante</h2>
        <p className="text-gray-400 text-sm text-center mb-8">
          Passionnés et expérimentés, ils vous accompagnent dans votre progression
        </p>

        <div className="flex justify-center gap-8 flex-wrap">
          {STAFF.map((member, index) => {
            const staffPhotoPath = `/images/staff/staff_${member.name.toLowerCase()}.jpg`;
            const hasPhoto = false; // 🔧 Mettre à true quand photos uploadées

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

      {/* Google Maps */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <IconMapPin />
          Nous trouver
        </h2>
        <Card className="overflow-hidden" hover={false}>
          <div className="h-64 relative">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                CONTACT.fullAddress
              )}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-400">{CONTACT.fullAddress}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                CONTACT.fullAddress
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 text-sm hover:underline mt-2 inline-block"
            >
              Ouvrir dans Google Maps →
            </a>
          </div>
        </Card>
      </section>

      {/* Modal Galerie */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{modalTitle}</h3>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
              <Image
                src={images[modalPhotos[currentPhotoIndex]] || images["ui-hero-accueil"]}
                alt={`${modalTitle} ${currentPhotoIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={prevPhoto}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium"
              >
                ← Précédent
              </button>
              <span className="text-white text-sm">
                {currentPhotoIndex + 1} / {modalPhotos.length}
              </span>
              <button
                onClick={nextPhoto}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium"
              >
                Suivant →
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {modalPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPhotoIndex(idx)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${
                    idx === currentPhotoIndex
                      ? "ring-2 ring-red-500"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={images[photo] || images["ui-hero-accueil"]}
                    alt={`Miniature ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
