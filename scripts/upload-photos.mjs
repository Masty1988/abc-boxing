import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
import dotenv from "dotenv";

const prisma = new PrismaClient();

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📂 CHEMIN DE TON DOSSIER PHOTOS (Change le chemin ici !)
const DOSSIER_PHOTOS = "C:/Users/Nlesi/DEV/MWD/cloudinary-abc";

async function main() {
  console.log(`🚀 Démarrage de l'analyse du dossier : ${DOSSIER_PHOTOS}`);

  if (!fs.existsSync(DOSSIER_PHOTOS)) {
    console.error(`❌ ERREUR : Le dossier n'existe pas ! Vérifie le chemin.`);
    return;
  }

  const files = fs.readdirSync(DOSSIER_PHOTOS);
  console.log(`📂 ${files.length} fichiers trouvés.`);

  for (const file of files) {
    if (file.startsWith(".")) continue;

    const extension = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(extension)) continue;

    const originalName = path.parse(file).name;

    // Nettoyage du nom (ex: "Combat Finale" -> "combat-finale")
    const cleanKey = slugify(originalName, {
      lower: true,
      strict: true,
      replacement: "-",
    });

    // Détection basique de catégorie (facultatif, pour ta BDD)
    let category = "AUTRE";
    if (cleanKey.startsWith("combat")) category = "COMBAT";
    if (cleanKey.startsWith("entrainement")) category = "ENTRAINEMENT";
    if (cleanKey.startsWith("ui") || cleanKey.startsWith("site"))
      category = "UI";

    const filePath = path.join(DOSSIER_PHOTOS, file);
    console.log(
      `📸 Traitement : "${originalName}" -> Clé : "${cleanKey}" [Cat: ${category}]`
    );

    try {
      // 1. Upload Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: cleanKey,
        folder: "abc-boxing-assets",
        overwrite: true,
      });

      // 2. Sauvegarde Prisma
      // Note: Assure-toi d'avoir ajouté le champ 'category' dans ton schema.prisma
      // Sinon, retire la ligne 'category: ...' ci-dessous
      await prisma.siteImage.upsert({
        where: { key: cleanKey },
        update: {
          url: result.secure_url,
          format: result.format,
          width: result.width,
          height: result.height,
          category: category, // <--- La fameuse catégorie auto
        },
        create: {
          key: cleanKey,
          url: result.secure_url,
          format: result.format,
          width: result.width,
          height: result.height,
          category: category,
        },
      });

      console.log(`✅ OK !`);
    } catch (error) {
      console.error(`❌ Erreur sur ${file}:`, error.message);
    }
  }
}

main()
  .then(async () => {
    console.log("🏁 Import terminé !");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
