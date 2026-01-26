// scripts/init-photos.ts
// Exécuter avec: npx tsx scripts/init-photos.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const photoSlots = [
  // Page Accueil
  { page: "accueil", slot: "hero", label: "Hero (fond)", imageUrl: "/images/hero.jpg", ordre: 0 },
  { page: "accueil", slot: "logo", label: "Logo", imageUrl: "/images/abc-boxing.jpg", ordre: 1 },
  { page: "accueil", slot: "event", label: "Événement", imageUrl: "/images/choc.jpg", ordre: 2 },

  // Page Club
  { page: "club", slot: "president", label: "Photo Président", imageUrl: "/images/officiel.jpg", ordre: 0 },
  { page: "club", slot: "trophees", label: "Trophées", imageUrl: "/images/trophee.jpg", ordre: 1 },
  { page: "club", slot: "staff1", label: "Staff 1", imageUrl: "/images/officiel.jpg", ordre: 2 },
  { page: "club", slot: "staff2", label: "Staff 2", imageUrl: "/images/fede.jpg", ordre: 3 },
  { page: "club", slot: "staff3", label: "Staff 3", imageUrl: "/images/engage2.jpg", ordre: 4 },

  // Page News
  { page: "news", slot: "post1", label: "Article 1", imageUrl: "/images/engage.jpg", ordre: 0 },
  { page: "news", slot: "post2", label: "Article 2", imageUrl: "/images/kick.jpg", ordre: 1 },
  { page: "news", slot: "post3", label: "Article 3", imageUrl: "/images/fede.jpg", ordre: 2 },

  // Page Galerie
  { page: "galerie", slot: "photo1", label: "Photo 1", imageUrl: "/images/kick.jpg", ordre: 0 },
  { page: "galerie", slot: "photo2", label: "Photo 2", imageUrl: "/images/engage2.jpg", ordre: 1 },
  { page: "galerie", slot: "photo3", label: "Photo 3", imageUrl: "/images/trophee.jpg", ordre: 2 },
  { page: "galerie", slot: "photo4", label: "Photo 4", imageUrl: "/images/choc.jpg", ordre: 3 },
  { page: "galerie", slot: "photo5", label: "Photo 5", imageUrl: "/images/fede.jpg", ordre: 4 },
  { page: "galerie", slot: "photo6", label: "Photo 6", imageUrl: "/images/engage.jpg", ordre: 5 },
  { page: "galerie", slot: "photo7", label: "Photo 7", imageUrl: "/images/hero.jpg", ordre: 6 },
  { page: "galerie", slot: "photo8", label: "Photo 8", imageUrl: "/images/officiel.jpg", ordre: 7 },
];

async function main() {
  console.log("🖼️  Initialisation des slots photos...");

  for (const slot of photoSlots) {
    await prisma.photoSlot.upsert({
      where: {
        page_slot: {
          page: slot.page,
          slot: slot.slot,
        },
      },
      update: {
        label: slot.label,
        imageUrl: slot.imageUrl,
        ordre: slot.ordre,
      },
      create: slot,
    });
    console.log(`   ✓ ${slot.page}/${slot.slot}`);
  }

  console.log("");
  console.log("✅ Slots photos initialisés !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
