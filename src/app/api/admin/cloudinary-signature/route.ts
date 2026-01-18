// API Route pour générer une signature Cloudinary sécurisée
// ⚠️ IMPORTANT : Cette signature force le public_id = slot.id (pas de choix libre)

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { getSlotById } from "@/config/site-images";

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // 1. Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // 2. Récupérer le slot demandé
    const body = await req.json();
    const { slotId } = body;

    if (!slotId) {
      return NextResponse.json({ error: "slotId requis" }, { status: 400 });
    }

    // 3. Vérifier que le slot existe dans la config
    const slot = getSlotById(slotId);
    if (!slot) {
      return NextResponse.json(
        { error: "Slot invalide" },
        { status: 400 }
      );
    }

    // 4. Générer la signature Cloudinary
    const timestamp = Math.round(Date.now() / 1000);

    const uploadParams = {
      timestamp,
      folder: "abc-boxing-assets",
      public_id: slotId, // ⚠️ On force le public_id = slot.id
      overwrite: true, // ⚠️ Écrase l'image existante
      invalidate: true, // Purge le cache CDN
    };

    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      process.env.CLOUDINARY_API_SECRET!
    );

    // 5. Retourner les paramètres d'upload
    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: "abc-boxing-assets",
      publicId: slotId,
    });
  } catch (error) {
    console.error("Erreur génération signature:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
