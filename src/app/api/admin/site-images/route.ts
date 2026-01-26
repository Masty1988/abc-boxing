// API Route pour gérer les SiteImages (GET toutes les images, PUT update)

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { invalidateImageCache } from "@/lib/cloudinary";

// GET : Récupérer toutes les images
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const images = await prisma.siteImage.findMany({
      select: {
        key: true,
        url: true,
        description: true,
        format: true,
        width: true,
        height: true,
        category: true,
        updatedAt: true,
      },
      orderBy: {
        key: "asc",
      },
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Erreur GET site-images:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT : Mettre à jour une image (upsert)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { key, url, format, width, height, category, description } = body;

    if (!key || !url) {
      return NextResponse.json(
        { error: "key et url sont requis" },
        { status: 400 }
      );
    }

    // Upsert (créer si n'existe pas, mettre à jour sinon)
    const image = await prisma.siteImage.upsert({
      where: { key },
      update: {
        url,
        format,
        width,
        height,
        category,
        description,
      },
      create: {
        key,
        url,
        format,
        width,
        height,
        category,
        description,
      },
    });

    // Invalider le cache en mémoire des images
    invalidateImageCache();

    // Revalider les pages qui utilisent des images
    revalidatePath("/");
    revalidatePath("/club");
    revalidatePath("/galerie");
    revalidatePath("/disciplines");
    revalidatePath("/inscription");

    return NextResponse.json({ image });
  } catch (error) {
    console.error("Erreur PUT site-images:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
