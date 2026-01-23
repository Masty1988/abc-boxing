import type { Metadata } from "next";
import Link from "next/link";
import { Button, Card, OptimizedImage } from "@/components/ui";
import { IconCalendar, IconClock, IconPhone, IconMapPin } from "@/components/icons";
import { HORAIRES, CONTACT } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { getImages } from "@/lib/get-images";

export const metadata: Metadata = {
  title: "ABC Boxing La Rochelle - Savate, Boxe Française & Kickboxing",
  description: "Club de Boxe Française, Savate et Kickboxing K-1 à La Rochelle. Cours pour enfants et adultes, loisir et compétition. Rejoignez-nous !",
  openGraph: {
    title: "ABC Boxing La Rochelle",
    description: "Club de Boxe Française, Savate et Kickboxing à La Rochelle",
    type: "website",
  },
};

export default async function HomePage() {
  // Récupérer les images Cloudinary
  const images = await getImages();

  // Récupérer le prochain événement publié
  const prochainEvent = await prisma.event.findFirst({
    where: {
      publie: true,
      date: { gte: new Date() },
    },
    orderBy: { date: "asc" },
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24">
      {/* HERO */}
      <section className="relative h-[75vh] min-h-[500px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Image de fond Cloudinary */}
        <OptimizedImage
          src={images["ui-hero-accueil"].url}
          alt="ABC Boxing Club"
          fill
          className="object-cover"
          priority ={true}
          imageSize="hero"
          updatedAt={images["ui-hero-accueil"].updatedAt}
        />

        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        {/* Contenu */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo avec animation bounce */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-500/50 shadow-2xl mb-6 animate-bounce">
            <OptimizedImage
              src="/images/abc-boxing.jpg"
              alt="ABC Boxing Logo"
              width={96}
              height={96}
              className="object-cover"
              priority
              imageSize="logo"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            <span className="text-white">Dépasse-toi.</span>
            <br />
            <span className="text-red-500">Rejoins le ring.</span>
          </h1>

          <p className="text-gray-300 text-lg max-w-md mb-6">
            ABC Boxing 
            <br></br>
          <span style={{ color: "#ef4444" }}>Boxe Française • Kickboxing • La Rochelle</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/inscription">
              <Button size="lg">S&apos;inscrire</Button>
            </Link>
            <a href={CONTACT.phoneLink}>
              <Button size="lg" variant="secondary">
                <IconPhone />
                Appeler
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* HORAIRES */}
      <section className="px-4 py-8 -mt-8 relative z-20">
        <Card className="p-6" hover={false}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <IconClock />
            Horaires d&apos;entraînement
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {HORAIRES.slice(0, 4).map((h, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-3">
                <div className="text-red-400 font-bold text-sm">{h.jour}</div>
                <div className="text-white text-xs">{h.cours}</div>
                <div className="text-gray-400 text-xs">{h.heures}</div>
              </div>
            ))}
          </div>
          <Link href="/inscription" className="block mt-4">
            <Button variant="secondary" className="w-full">
              Voir tous les horaires & tarifs
            </Button>
          </Link>
        </Card>
      </section>

      {/* PROCHAIN ÉVÉNEMENT - DYNAMIQUE */}
      {prochainEvent && (
        <section className="px-4 py-8">
          <Card className="overflow-hidden" hover={false}>
            {/* Image ou placeholder */}
            <div className="h-48 relative bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center">
              {prochainEvent.imageUrl ? (
                <OptimizedImage
                  src={prochainEvent.imageUrl}
                  alt={prochainEvent.titre}
                  fill
                  className="object-cover"
                  imageSize="card"
                />
              ) : (
                <div className="text-center">
                  <span className="text-6xl">🥊</span>
                </div>
              )}
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-red-500/80 text-white z-10">
                PROCHAIN EVENT
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <IconCalendar />
                <span>
                  {new Date(prochainEvent.date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                  {" — "}
                  {new Date(prochainEvent.date).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{prochainEvent.titre}</h3>
              <p className="text-gray-400 text-sm mb-4">{prochainEvent.description}</p>
              {prochainEvent.lienReservation ? (
                <a
                  href={prochainEvent.lienReservation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="info" className="w-full">
                    Réserver ma place
                    {prochainEvent.prix && ` — ${prochainEvent.prix}€`}
                  </Button>
                </a>
              ) : (
                <Button variant="info" className="w-full" disabled>
                  {prochainEvent.prix
                    ? `Tarif : ${prochainEvent.prix}€`
                    : "Entrée gratuite"}
                </Button>
              )}
            </div>
          </Card>
        </section>
      )}
      

      {/* Google Maps avec background */}
      <section className="px-6 py-8 relative">
        {/* Image de fond optionnelle */}
        {images["ui-background-contact"]?.url && images["ui-background-contact"].url !== "/images/placeholder.svg" && (
          <>
            <OptimizedImage
              src={images["ui-background-contact"].url}
              alt="Contact background"
              fill
              className="object-cover opacity-20"
              imageSize="hero"
              updatedAt={images["ui-background-contact"].updatedAt}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212]" />
          </>
        )}
        <div className="relative z-10">
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
                title="Localisation ABC Boxing La Rochelle"
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
        </div>
      </section>

      {/* Avis Google - Bandeau compact */}
      <section className="px-4 py-6 bg-white/5">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-h-[150px]">
          {/* Note et étoiles */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <span className="text-white font-bold text-sm">5.0</span>
            <span className="text-gray-400 text-xs">Google</span>
          </div>

          {/* Mini-bulles d'avis */}
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-[10px]">S</span>
              </div>
              <p className="text-gray-300 text-xs italic truncate max-w-[180px]">&quot;Super club, ambiance remarquable&quot;</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-[10px]">M</span>
              </div>
              <p className="text-gray-300 text-xs italic truncate max-w-[180px]">&quot;Génial, ça m&apos;a remotivé !&quot;</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-[10px]">L</span>
              </div>
              <p className="text-gray-300 text-xs italic truncate max-w-[180px]">&quot;Coachs au top, je recommande&quot;</p>
            </div>
          </div>

          {/* Lien Google */}
          <a
            href="https://www.google.com/search?q=Abc+boxing+Savate+Boxe+Fran%C3%A7aise+%26+Kick+Boxing+K1+La+Rochelle+avis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs text-gray-300 hover:text-white transition-all shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Voir les avis
          </a>
        </div>
      </section>

      {/* Fédérations - Bandeau compact */}
      <section className="px-4 py-4 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="text-gray-400 text-xs font-medium">Club affilié</span>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-white p-2">
              <OptimizedImage
                src="/images/logofede.jpg"
                alt="FFSBFDA"
                width={80}
                height={80}
                className="object-contain w-full h-full"
                imageSize="thumbnail"
              />
            </div>
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-white p-2">
              <OptimizedImage
                src="/images/FFKMDA-1536x635.png"
                alt="FFKMDA"
                width={80}
                height={80}
                className="object-contain w-full h-full"
                imageSize="thumbnail"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mentions Légales */}
      <section className="px-6 py-4">
        <div className="text-center">
          <Link
            href="/mentions-legales"
            className="text-sm text-gray-500 hover:text-red-400 transition-colors underline"
          >
            Mentions Légales
          </Link>
        </div>
      </section>
    </div>
  );
}
