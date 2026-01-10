import Link from "next/link";
import Image from "next/image";
import { Button, Card } from "@/components/ui";
import { IconCalendar, IconClock, IconPhone, IconMapPin } from "@/components/icons";
import { HORAIRES, CONTACT } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
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
      <section className="relative h-[75vh] min-h-[500px] flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-red-900 via-black to-gray-900">
        {/* Overlay sombre pour effet */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Contenu */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo avec animation bounce */}
          <div className="w-20 h-20 rounded-full bg-red-500/20 backdrop-blur-md border-2 border-red-500/50 flex items-center justify-center mb-6 animate-bounce">
            <span className="text-4xl">🥊</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            <span className="text-white">Dépasse-toi.</span>
            <br />
            <span className="text-red-500">Rejoins le ring.</span>
          </h1>

          <p className="text-gray-300 text-lg max-w-md mb-6">
            ABC Boxing Club La Rochelle — Savate, Boxe Française, Kickboxing
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
                <Image
                  src={prochainEvent.imageUrl}
                  alt={prochainEvent.titre}
                  fill
                  className="object-cover"
                  loading="lazy"
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

      {/* LOCALISATION RAPIDE */}
      <section className="px-4 py-8">
        <Card className="p-6" hover={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <IconMapPin className="text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Nous trouver</h3>
                <p className="text-sm text-gray-400">{CONTACT.fullAddress}</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
