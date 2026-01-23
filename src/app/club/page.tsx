"use client";

import Image from "next/image";
import { Card } from "@/components/ui";
import { IconTrophy, IconMapPin } from "@/components/icons";
import { IMAGES, STAFF, CLUB_STATS, CONTACT } from "@/lib/constants";

export default function ClubPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24">
      <div className="h-32 bg-gradient-to-b from-red-900/30 to-transparent flex items-end px-6 pb-4">
        <h1 className="text-3xl font-black">L&apos;Esprit Club</h1>
      </div>

      {/* Mot du Président */}
      <section className="px-6 py-8">
        <Card className="p-6" hover={false}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-red-500/20 relative">
              <Image src={IMAGES.officiel} alt="Vincent" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Le Mot du Président</h3>
              <p className="text-gray-400 italic leading-relaxed">
                &quot;Bienvenue à La Rochelle. Ici, on forme des champions, mais surtout des humains. Le respect, le dépassement de soi et la solidarité sont nos valeurs fondamentales.&quot;
              </p>
              <p className="text-sm text-red-400 mt-3 font-medium">— Vincent, Président ABC Boxing</p>
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
        <Card className="overflow-hidden mb-4" hover={false}>
          <div className="h-48 relative">
            <Image src={IMAGES.trophee} alt="Trophées" fill className="object-cover" />
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-3">
          {CLUB_STATS.map((s, i) => (
            <Card key={i} className="p-4 text-center">
              <div className="text-3xl font-black text-red-500">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Staff */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4">L&apos;Équipe Encadrante</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {STAFF.map((m, i) => (
            <Card key={i} className="p-4 min-w-[140px] text-center shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 relative">
                <Image src={m.image} alt={m.name} fill className="object-cover" />
              </div>
              <div className="font-bold">{m.name}</div>
              <div className="text-xs text-gray-400">{m.role}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Localisation */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <IconMapPin />
          Nous trouver
        </h2>
        <Card className="overflow-hidden" hover={false}>
          <div className="h-48 bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl mb-2 block">📍</span>
              <p className="text-sm text-gray-400">Google Maps</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-400">{CONTACT.fullAddress}</p>
          </div>
        </Card>
      </section>
    </div>
  );
}
