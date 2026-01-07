// scripts/create-admin.ts
// Exécuter avec: npx ts-node scripts/create-admin.ts
// Ou: npx tsx scripts/create-admin.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = "taz";
  const password = "ABC2024!"; // À CHANGER EN PROD !
  const nom = "Vincent";

  // Hash du mot de passe
  const passwordHash = await bcrypt.hash(password, 12);

  // Créer ou mettre à jour l'admin
  const admin = await prisma.admin.upsert({
    where: { username },
    update: { passwordHash, nom },
    create: { username, passwordHash, nom },
  });

  console.log("✅ Admin créé/mis à jour:");
  console.log(`   Username: ${admin.username}`);
  console.log(`   Mot de passe: ${password}`);
  console.log("");
  console.log("⚠️  PENSEZ À CHANGER LE MOT DE PASSE EN PRODUCTION !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
