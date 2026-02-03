import type { Metadata } from "next";
import { Card } from "@/components/ui";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions Légales - ABC Boxing La Rochelle",
  description: "Mentions légales du site ABC Boxing La Rochelle. Informations sur l'éditeur, l'hébergement et la protection des données.",
  robots: {
    index: false,
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24">
      {/* Header */}
      <div className="h-32 bg-gradient-to-b from-red-900/30 to-transparent flex items-end px-6 pb-4">
        <h1 className="text-3xl font-black">Mentions Légales</h1>
      </div>

      {/* Contenu */}
      <section className="px-6 py-8 space-y-6">
        {/* Éditeur du site */}
        <Card className="p-6" hover={false}>
          <h2 className="text-xl font-bold mb-4 text-red-400">Éditeur du site</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p><strong>Nom de l&apos;association :</strong> ABC Boxing La Rochelle</p>
            <p><strong>Adresse :</strong> {CONTACT.fullAddress}</p>
            <p><strong>Téléphone :</strong> {CONTACT.phone}</p>
            <p><strong>Email :</strong> {CONTACT.email}</p>
            <p><strong>Présidente :</strong> Nathalie Joly</p>
          </div>
        </Card>

        {/* Hébergement */}
        <Card className="p-6" hover={false}>
          <h2 className="text-xl font-bold mb-4 text-red-400">Hébergement</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p><strong>Hébergeur :</strong> Netlify, Inc.</p>
            <p><strong>Adresse :</strong> 512 2nd Street, Suite 200, San Francisco, CA 94107, USA</p>
            <p><strong>Site web :</strong> <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">www.netlify.com</a></p>
          </div>
        </Card>

        {/* Propriété intellectuelle */}
        <Card className="p-6" hover={false}>
          <h2 className="text-xl font-bold mb-4 text-red-400">Propriété intellectuelle</h2>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, vidéos, logo, etc.) est la propriété exclusive d&apos;ABC Boxing La Rochelle, sauf mention contraire.
            </p>
            <p>
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l&apos;accord exprès par écrit d&apos;ABC Boxing La Rochelle.
            </p>
          </div>
        </Card>

        {/* Données personnelles */}
        <Card className="p-6" hover={false}>
          <h2 className="text-xl font-bold mb-4 text-red-400">Protection des données personnelles</h2>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant.
            </p>
            <p>
              Les informations recueillies via le formulaire d&apos;inscription sont destinées uniquement à ABC Boxing La Rochelle pour la gestion administrative des adhésions.
            </p>
            <p>
              Pour exercer vos droits, vous pouvez nous contacter à l&apos;adresse : <a href={`mailto:${CONTACT.email}`} className="text-red-400 hover:underline">{CONTACT.email}</a>
            </p>
          </div>
        </Card>

        {/* Cookies */}
        <Card className="p-6" hover={false}>
          <h2 className="text-xl font-bold mb-4 text-red-400">Cookies</h2>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>
              Ce site utilise des cookies techniques nécessaires au bon fonctionnement du site (authentification administrateur).
            </p>
            <p>
              Aucun cookie de suivi ou de publicité n&apos;est utilisé.
            </p>
          </div>
        </Card>

        {/* Crédits */}
        <Card className="p-6" hover={false}>
          <h2 className="text-xl font-bold mb-4 text-red-400">Crédits</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p><strong>Conception et développement :</strong> <a href="https://www.mastywebdev.fr" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">MastyWebDev</a></p>
            <p><strong>Site web :</strong> <a href="https://www.mastywebdev.fr" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">www.mastywebdev.fr</a></p>
            <p><strong>Technologies :</strong> Next.js 14, React, TypeScript, Tailwind CSS</p>
            <p><strong>Photos :</strong> © ABC Boxing La Rochelle</p>
            <p><strong>Icônes animées :</strong> <a href="https://lordicon.com/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">Lordicon.com</a></p>
          </div>
        </Card>

        {/* Responsabilité */}
        <Card className="p-6" hover={false}>
          <h2 className="text-xl font-bold mb-4 text-red-400">Limitation de responsabilité</h2>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>
              ABC Boxing La Rochelle s&apos;efforce de fournir des informations exactes et à jour. Toutefois, l&apos;association ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition sur ce site.
            </p>
            <p>
              ABC Boxing La Rochelle ne pourra être tenue responsable des dommages directs ou indirects résultant de l&apos;utilisation de ce site.
            </p>
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6 bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30" hover={false}>
          <h2 className="text-xl font-bold mb-4 text-white">Une question ?</h2>
          <p className="text-sm text-gray-300 mb-4">
            Pour toute question concernant ces mentions légales ou l&apos;utilisation de ce site, n&apos;hésitez pas à nous contacter.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium text-center transition-colors"
            >
              📧 Nous écrire
            </a>
            <a
              href={CONTACT.phoneLink}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium text-center transition-colors"
            >
              📞 Nous appeler
            </a>
          </div>
        </Card>

        {/* Date de mise à jour */}
        <p className="text-center text-xs text-gray-500 mt-8">
          Dernière mise à jour : Janvier 2026
        </p>
      </section>
    </div>
  );
}
