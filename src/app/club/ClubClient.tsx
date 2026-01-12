"use client";

import { useState } from "react";
import { Card, OptimizedImage } from "@/components/ui";
import { IconTrophy, IconMapPin, IconFacebook, IconInstagram, IconTikTok, IconYouTube } from "@/components/icons";
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

// Photos engagement Octobre Rose (statiques)
const OCTOBRE_ROSE_PHOTOS = [
  "/images/engage/ui-logo-rose.jpg",
  "/images/engage/ui-octobrerose.jpg",
  "/images/engage/ui-octobrerose-2.jpg",
  "/images/engage/ui-octobrerose-3.jpg",
  "/images/engage/engage.jpg",
  "/images/engage/engage2.jpg",
];

export function ClubClient({ images, totalAdherents }: ClubClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPhotos, setModalPhotos] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isStaticPhotos, setIsStaticPhotos] = useState(false); // Pour différencier photos statiques vs Cloudinary

  const openModal = (photos: string[], title: string, useStatic = false) => {
    setModalPhotos(photos);
    setModalTitle(title);
    setCurrentPhotoIndex(0);
    setIsStaticPhotos(useStatic);
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
              <OptimizedImage
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
            <OptimizedImage
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
            <OptimizedImage
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
            <OptimizedImage
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

      {/* Notre Engagement - Octobre Rose */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">💗</span>
          Notre Engagement
        </h2>
        <Card
          className="overflow-hidden cursor-pointer group"
          hover={true}
          onClick={() => openModal(OCTOBRE_ROSE_PHOTOS, "Octobre Rose - Ensemble contre le cancer du sein", true)}
        >
          <div className="h-48 relative">
            <OptimizedImage
              src="/images/engage/ui-logo-rose.jpg"
              alt="Octobre Rose"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="bg-pink-500/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <span className="text-2xl">💗</span>
                <span className="font-bold text-white">
                  +{OCTOBRE_ROSE_PHOTOS.length} photos
                </span>
              </div>
            </div>
          </div>
        </Card>
        <p className="text-gray-400 text-sm mt-3 italic text-center">
          ABC Boxing s&apos;engage chaque année pour Octobre Rose. Ensemble, nous soutenons la lutte contre le cancer du sein.
        </p>
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

      {/* Réseaux Sociaux */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4 text-center">Suivez-nous</h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Restez connectés avec ABC Boxing sur les réseaux sociaux
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a
            href="https://www.facebook.com/Abcboxinglarochelle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-blue-600/20 rounded-xl transition-all group"
          >
            <IconFacebook className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-400 group-hover:text-blue-400">Facebook</span>
          </a>
          <a
            href="https://www.instagram.com/abcboxingboxefrancaisekick/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-pink-600/20 rounded-xl transition-all group"
          >
            <IconInstagram className="w-10 h-10 text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-400 group-hover:text-pink-400">Instagram</span>
          </a>
          <a
            href="https://www.tiktok.com/@abcboxingboxefran"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-gray-800/20 rounded-xl transition-all group"
          >
            <IconTikTok className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-400 group-hover:text-white">TikTok</span>
          </a>
          <a
            href="https://www.youtube.com/@abcboxing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-red-600/20 rounded-xl transition-all group"
          >
            <IconYouTube className="w-10 h-10 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-400 group-hover:text-red-400">YouTube</span>
          </a>
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
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Bouton Fermer */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-2xl z-10 backdrop-blur-sm"
          >
            ✕
          </button>

          {/* Compteur */}
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-bold z-10 backdrop-blur-sm">
            {currentPhotoIndex + 1} / {modalPhotos.length}
          </div>

          {/* Titre */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg bg-black/70 text-white text-lg font-bold z-10 backdrop-blur-sm">
            {modalTitle}
          </div>

          {/* Navigation Précédent */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
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
                src={
                  isStaticPhotos
                    ? modalPhotos[currentPhotoIndex]
                    : (images[modalPhotos[currentPhotoIndex] as keyof SiteImages] || images["ui-hero-accueil"])
                }
                alt={`${modalTitle} ${currentPhotoIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-6 overflow-x-auto pb-2 max-w-full px-4">
              {modalPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPhotoIndex(idx);
                  }}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                    idx === currentPhotoIndex
                      ? "ring-4 ring-red-500 scale-110"
                      : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <OptimizedImage
                    src={
                      isStaticPhotos
                        ? photo
                        : (images[photo as keyof SiteImages] || images["ui-hero-accueil"])
                    }
                    alt={`Miniature ${idx + 1}`}
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
              nextPhoto();
            }}
            className="absolute right-4 w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-3xl z-10 backdrop-blur-sm transition-all hover:scale-110"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
