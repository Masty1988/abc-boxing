"use client";

import { useState } from "react";
import { Card, Button, Badge, ToggleTabs } from "@/components/ui";
import { TarifCard } from "@/components/inscription/TarifCard";
import { InscriptionForm } from "@/components/inscription/InscriptionForm";
import { IconClock, IconCheck, IconPhone } from "@/components/icons";
import { TARIFS, HORAIRES, CONTACT } from "@/lib/constants";
import { Category } from "@/lib/types";
import { getSeasonLabel } from "@/lib/utils/season";

export default function InscriptionPage() {
  const [category, setCategory] = useState<Category>("adultes");
  const [selectedTarif, setSelectedTarif] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const seasonLabel = getSeasonLabel();

  const filteredTarifs = TARIFS.filter((t) => t.category === category);
  const loisirTarifs = filteredTarifs.filter((t) => t.type === "loisir");
  const competitionTarifs = filteredTarifs.filter((t) => t.type === "competition");

  const categoryHoraires = HORAIRES.filter(
    (h) => !h.category || h.category === category
  );

  const selectedTarifData = TARIFS.find((t) => t.id === selectedTarif);

  // Si le formulaire est affiché
  if (showForm && selectedTarifData) {
    return (
      <div className="min-h-screen bg-[#121212] text-white pb-24">
        <div className="bg-gradient-to-b from-red-900/30 to-transparent px-6 py-8">
          <h1 className="text-3xl font-black mb-2">Inscription</h1>
          <p className="text-gray-400">{seasonLabel}</p>
        </div>
        <InscriptionForm
          tarif={selectedTarifData}
          category={category}
          onBack={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-red-900/30 to-transparent px-6 py-8">
        <h1 className="text-3xl font-black mb-2">Inscription</h1>
        <p className="text-gray-400">{seasonLabel}</p>
      </div>

      {/* Toggle Enfants / Adultes */}
      <div className="px-4 -mt-2">
        <ToggleTabs
          tabs={[
            { id: "adultes", label: "Adultes", icon: <span>👤</span> },
            { id: "enfants", label: "Enfants", icon: <span>👶</span> },
          ]}
          activeTab={category}
          onChange={(id) => {
            setCategory(id as Category);
            setSelectedTarif(null);
          }}
        />
      </div>

      {/* Section Loisir */}
      <section className="px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="success">LOISIR</Badge>
          <span className="text-sm text-gray-400">Pratique détente</span>
        </div>
        <div className="space-y-4">
          {loisirTarifs.map((tarif) => (
            <TarifCard
              key={tarif.id}
              tarif={tarif}
              selected={selectedTarif === tarif.id}
              onSelect={() => setSelectedTarif(tarif.id)}
            />
          ))}
        </div>
      </section>

      {/* Section Compétition */}
      <section className="px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="danger">COMPÉTITION</Badge>
          <span className="text-sm text-gray-400">Licence & passeport inclus</span>
        </div>
        <div className="space-y-4">
          {competitionTarifs.map((tarif) => (
            <TarifCard
              key={tarif.id}
              tarif={tarif}
              selected={selectedTarif === tarif.id}
              onSelect={() => setSelectedTarif(tarif.id)}
            />
          ))}
        </div>
      </section>

      {/* Bouton continuer si tarif sélectionné */}
      {selectedTarif && (
        <section className="px-4 py-4">
          <Button
            size="lg"
            className="w-full"
            onClick={() => setShowForm(true)}
          >
            Continuer l&apos;inscription
          </Button>
        </section>
      )}

      {/* Horaires correspondants */}
      <section className="px-4 py-8">
        <Card className="p-6" hover={false}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <IconClock />
            Horaires {category === "enfants" ? "Enfants" : "Adultes"}
          </h3>
          <div className="space-y-3">
            {categoryHoraires.map((h, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
              >
                <div>
                  <span className="font-medium text-white">{h.jour}</span>
                  <span className="text-gray-400 text-sm ml-2">{h.cours}</span>
                </div>
                <span className="text-red-400 font-mono text-sm">{h.heures}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Infos complémentaires */}
      <section className="px-4 py-8">
        <Card className="p-6 bg-blue-500/10 border-blue-500/30" hover={false}>
          <h3 className="font-bold mb-3 text-blue-400">📋 Documents requis</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <IconCheck className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              Certificat médical de moins de 3 mois
            </li>
            <li className="flex items-start gap-2">
              <IconCheck className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              Photo d&apos;identité
            </li>
            <li className="flex items-start gap-2">
              <IconCheck className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              Règlement (CB, espèces ou chèque)
            </li>
          </ul>
        </Card>
      </section>

      {/* CTA Final */}
      <section className="px-4 py-8">
        <Card className="p-6 text-center" hover={false}>
          <h3 className="font-bold text-xl mb-2">Une question ?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Contactez-nous ou passez directement au gymnase pendant les heures d&apos;entraînement.
          </p>
          <a href={CONTACT.phoneLink}>
            <Button size="lg" className="w-full">
              <IconPhone />
              {CONTACT.phone}
            </Button>
          </a>
        </Card>
      </section>
    </div>
  );
}
