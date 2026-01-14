import Link from "next/link";
import { Button, Card, OptimizedImage } from "@/components/ui";
import { IconCalendar, IconClock, IconPhone, IconMapPin } from "@/components/icons";
import { HORAIRES, CONTACT } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { getImages } from "@/lib/get-images";

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
          src={images["ui-hero-accueil"]}
          alt="ABC Boxing Club"
          fill
          className="object-cover"
          priority
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

      {/* Affiliations Fédérations */}
      <section className="px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Affiliations Officielles</h2>
          <p className="text-gray-400 text-sm">Club agréé et reconnu par les fédérations nationales</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* FFSBFDA - Boxe Française */}
          <Card className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-700/20 border-blue-500/30" hover={false}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-white p-3 shadow-lg">
                <OptimizedImage
                  src="/images/logofede.jpg"
                  alt="Fédération Française de Savate Boxe Française"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">FFSBFDA</h3>
                <p className="text-blue-200 text-xs leading-relaxed">
                  Fédération Française de Savate Boxe Française et Disciplines Associées
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-[10px] font-medium border border-blue-500/30">
                    ✓ Club Agréé
                  </span>
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-[10px] font-medium border border-blue-500/30">
                    ✓ Encadrants Diplômés
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* FFKMDA - Kickboxing */}
          <Card className="p-6 bg-gradient-to-br from-orange-900/20 to-red-700/20 border-orange-500/30" hover={false}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-white p-3 shadow-lg">
                <OptimizedImage
                  src="/images/FFKMDA-1536x635.png"
                  alt="Fédération Française de Kickboxing Muay Thaï et Disciplines Associées"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">FFKMDA</h3>
                <p className="text-orange-200 text-xs leading-relaxed">
                  Fédération Française de Kickboxing, Muay Thaï et Disciplines Associées
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                  <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded-full text-[10px] font-medium border border-orange-500/30">
                    ✓ Club Affilié
                  </span>
                  <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded-full text-[10px] font-medium border border-orange-500/30">
                    ✓ Assurance Fédérale
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          Nos licenciés bénéficient d'une couverture assurance complète et d'un encadrement certifié par l'État
        </p>
      </section>

      {/* Mentions Légales */}
      <section className="px-6 py-4">
        <div className="text-center">
          <a
            href="/mentions-legales"
            className="text-sm text-gray-500 hover:text-red-400 transition-colors underline"
          >
            Mentions Légales
          </a>
        </div>
      </section>
    </div>
  );
}
