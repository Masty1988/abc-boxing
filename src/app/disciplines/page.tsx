import type { Metadata } from "next";
import Link from "next/link";
import { Card, Button, OptimizedImage } from "@/components/ui";
import { AnimatedBoxingGlove, IconShield, IconTrophy, IconScale, IconScroll } from "@/components/icons";

export const metadata: Metadata = {
  title: "Nos Disciplines - ABC Boxing La Rochelle",
  description: "Découvrez la Boxe Française (Savate) et le Kickboxing K-1 au club ABC Boxing La Rochelle. Sports de combat pieds-poings pour tous niveaux.",
  openGraph: {
    title: "Disciplines - ABC Boxing La Rochelle",
    description: "Boxe Française et Kickboxing K-1 à La Rochelle",
  },
};

export default function DisciplinesPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24">
      {/* Header */}
      <div className="h-32 bg-gradient-to-b from-red-900/30 to-transparent flex items-end px-6 pb-4">
        <h1 className="text-3xl font-black">Nos Disciplines</h1>
      </div>

      {/* Introduction */}
      <section className="px-6 py-6">
        <p className="text-gray-300 text-center leading-relaxed">
          ABC Boxing Club La Rochelle vous propose deux disciplines complémentaires
          pour progresser dans les sports de combat pieds-poings.
        </p>
      </section>

      {/* BOXE FRANÇAISE / SAVATE */}
      <section className="px-6 py-8">
        <Card className="overflow-hidden" hover={false}>
          {/* Image Hero BF */}
          <div className="h-56 relative bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
            <OptimizedImage
              src="/images/disciplines/boxe-francaise.jpg"
              alt="Boxe Française"
              fill
              className="object-cover"
              priority
              imageSize="hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/20 backdrop-blur-md border-2 border-blue-500/50 flex items-center justify-center">
                <AnimatedBoxingGlove className="w-16 h-16" />
              </div>
              <h2 className="text-3xl font-black text-white">Boxe Française</h2>
              <p className="text-blue-200 text-sm mt-1">Savate - Sport Noble</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Histoire */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <IconScroll className="w-5 h-5 text-blue-400" />
                Histoire
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                La Boxe Française, aussi appelée <strong>Savate</strong>, est née dans les rues de Paris
                au début du XIXᵉ siècle. Codifiée par Charles Lecour et Michel Casseux, elle devient
                rapidement un sport noble pratiqué dans les salles d&apos;armes parisiennes.
                Aujourd&apos;hui, la Savate est reconnue internationalement et fait partie du patrimoine
                sportif français, alliant technique, élégance et efficacité.
              </p>
            </div>

            {/* Règles */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <IconScale className="w-5 h-5 text-blue-400" />
                Règles & Caractéristiques
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span><strong>Pieds chaussés :</strong> Les coups de pied sont portés avec des chaussures spéciales (bottines de savate)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span><strong>Techniques autorisées :</strong> Coups de poing (directs, crochets, uppercuts) et coups de pied (fouetté, chassé, revers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span><strong>Surface de frappe :</strong> Uniquement avec les surfaces autorisées (dessus du pied, pointe, talon)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span><strong>Zones cibles :</strong> Buste et tête uniquement (jambes interdites)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span><strong>Esprit :</strong> Technicité, précision, élégance et fair-play</span>
                </li>
              </ul>
            </div>

            {/* Équipement */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-blue-400">🎒</span>
                Équipement Nécessaire
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-blue-400 font-bold text-sm mb-1">Tenue</div>
                  <div className="text-gray-400 text-xs">Short, débardeur</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-blue-400 font-bold text-sm mb-1">Bottines</div>
                  <div className="text-gray-400 text-xs">Chaussures de savate</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-blue-400 font-bold text-sm mb-1">Gants</div>
                  <div className="text-gray-400 text-xs">Boxe française</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-blue-400 font-bold text-sm mb-1">Protection</div>
                  <div className="text-gray-400 text-xs">Protège-dents, coquille</div>
                </div>
              </div>
            </div>

            {/* Niveaux / Grades */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 border border-blue-500/20 rounded-xl p-4">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <IconShield className="w-5 h-5 text-blue-400" />
                Système de Grades
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                La Boxe Française possède un système de grades progressifs matérialisés par des
                <strong className="text-blue-400"> gants de couleur</strong> : bleu, vert, rouge, blanc,
                jaune et argent (du débutant au expert). Ces grades valorisent la progression technique
                et l&apos;engagement du pratiquant.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* KICKBOXING K1 */}
      <section className="px-6 py-8">
        <Card className="overflow-hidden" hover={false}>
          {/* Image Hero K1 */}
          <div className="h-56 relative bg-gradient-to-br from-orange-900 to-red-700 flex items-center justify-center">
            <OptimizedImage
              src="/images/disciplines/kickboxing-k1.jpg"
              alt="Kickboxing K1"
              fill
              className="object-cover"
              imageSize="hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-orange-500/20 backdrop-blur-md border-2 border-orange-500/50 flex items-center justify-center">
                <IconTrophy className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-3xl font-black text-white">Kickboxing K-1</h2>
              <p className="text-orange-200 text-sm mt-1">Puissance & Explosivité</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Histoire */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <IconScroll className="w-5 h-5 text-orange-400" />
                Histoire
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Le <strong>K-1</strong> (Karate, Kung Fu, Kickboxing, Kakutougi) est une discipline
                de combat créée au Japon dans les années 1990. Inspiré du kickboxing japonais et thaï,
                le K-1 est devenu une référence mondiale grâce à ses galas spectaculaires réunissant
                les meilleurs combattants de la planète. C&apos;est un sport exigeant, intense et
                stratégique qui mêle puissance et technique.
              </p>
            </div>

            {/* Règles */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <IconScale className="w-5 h-5 text-orange-400" />
                Règles & Caractéristiques
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span><strong>Pieds nus :</strong> Contrairement à la Boxe Française, le K-1 se pratique pieds nus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span><strong>Techniques autorisées :</strong> Coups de poing, coups de pied, genoux (selon règlement)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span><strong>Zones cibles :</strong> Buste, tête, cuisses (low-kicks autorisés)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span><strong>Clinch limité :</strong> Saisies brèves pour placer un genou, pas de lutte au corps-à-corps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span><strong>Esprit :</strong> Explosivité, combativité, et spectacle</span>
                </li>
              </ul>
            </div>

            {/* Équipement */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-orange-400">🎒</span>
                Équipement Nécessaire
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-orange-400 font-bold text-sm mb-1">Tenue</div>
                  <div className="text-gray-400 text-xs">Short de combat</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-orange-400 font-bold text-sm mb-1">Gants</div>
                  <div className="text-gray-400 text-xs">Gants de boxe K-1</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-orange-400 font-bold text-sm mb-1">Protection</div>
                  <div className="text-gray-400 text-xs">Protège-tibias, coquille</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-orange-400 font-bold text-sm mb-1">Casque</div>
                  <div className="text-gray-400 text-xs">Pour sparring</div>
                </div>
              </div>
            </div>

            {/* Différence avec Boxe Française */}
            <div className="bg-gradient-to-br from-orange-500/10 to-red-900/10 border border-orange-500/20 rounded-xl p-4">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <AnimatedBoxingGlove className="w-16 h-16" />
                K-1 vs Boxe Française
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                Alors que la Boxe Française privilégie <strong className="text-blue-400">l&apos;élégance et la technicité</strong>,
                le K-1 met l&apos;accent sur <strong className="text-orange-400">la puissance et l&apos;explosivité</strong>.
                Les deux disciplines sont complémentaires et permettent de développer des qualités différentes.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Inscription */}
      <section className="px-6 py-8">
        <Card className="p-6 bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30 text-center">
          <div className="text-4xl mb-4">🥊</div>
          <h3 className="text-xl font-bold mb-2">Envie de tester ?</h3>
          <p className="text-gray-300 text-sm mb-4">
            Premier cours d&apos;essai gratuit • Ambiance conviviale • Tous niveaux
          </p>
          <Link href="/inscription">
            <Button size="lg" className="w-full">
              S&apos;inscrire maintenant
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
