"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui";
import { IconCheck } from "@/components/icons";
import type { InscriptionData, Tarif, Category } from "@/lib/types";

interface InscriptionFormProps {
  tarif: Tarif;
  category: Category;
  onBack: () => void;
}

export function InscriptionForm({ tarif, category, onBack }: InscriptionFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<InscriptionData>>({
    category,
    tarifId: tarif.id,
    tarifName: tarif.name,
    price: tarif.price,
  });

  const handleChange = (field: keyof InscriptionData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de l'inscription");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="px-4 py-8">
        <Card className="p-8 text-center bg-green-500/10 border-green-500/30" hover={false}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <IconCheck className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Inscription envoyée !</h2>
          <p className="text-gray-300 mb-6">
            Votre demande d&apos;inscription a bien été envoyée à Vincent.
            <br />
            Vous recevrez une confirmation par email sous peu.
          </p>
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 mb-2">Récapitulatif :</p>
            <p className="text-white font-bold">{formData.prenom} {formData.nom}</p>
            <p className="text-red-400">{tarif.name}</p>
            <p className="text-2xl font-black text-white mt-2">{tarif.price}€</p>
          </div>
          <Button onClick={() => window.location.href = "/"}>
            Retour à l&apos;accueil
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <Card className="p-6" hover={false}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Formulaire d&apos;inscription</h2>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-sm text-red-400 font-medium">{tarif.name}</p>
            <p className="text-2xl font-black text-white">{tarif.price}€</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informations personnelles */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Informations personnelles</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Prénom *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                  value={formData.prenom || ""}
                  onChange={(e) => handleChange("prenom", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nom *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                  value={formData.nom || ""}
                  onChange={(e) => handleChange("nom", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Date de naissance *</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                value={formData.dateNaissance || ""}
                onChange={(e) => handleChange("dateNaissance", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email *</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Téléphone *</label>
              <input
                type="tel"
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                value={formData.telephone || ""}
                onChange={(e) => handleChange("telephone", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Adresse *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                value={formData.adresse || ""}
                onChange={(e) => handleChange("adresse", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Code postal *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                  value={formData.codePostal || ""}
                  onChange={(e) => handleChange("codePostal", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Ville *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                  value={formData.ville || ""}
                  onChange={(e) => handleChange("ville", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Responsable légal si enfant */}
          {category === "enfants" && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-lg font-bold text-white">Responsable légal</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                    value={formData.responsablePrenom || ""}
                    onChange={(e) => handleChange("responsablePrenom", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                    value={formData.responsableNom || ""}
                    onChange={(e) => handleChange("responsableNom", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Téléphone *</label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                  value={formData.responsableTelephone || ""}
                  onChange={(e) => handleChange("responsableTelephone", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                  value={formData.responsableEmail || ""}
                  onChange={(e) => handleChange("responsableEmail", e.target.value)}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              disabled={loading}
              className="flex-1"
            >
              Retour
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Envoi en cours..." : "Envoyer l'inscription"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
