// src/app/api/photos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return null;
}

// =============================================================================
// GET - Liste des photos par page
// =============================================================================
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  try {
    const where = page ? { page } : {};
    
    const photos = await prisma.photoSlot.findMany({
      where,
      orderBy: [{ page: "asc" }, { ordre: "asc" }],
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Erreur GET photos:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// =============================================================================
// PUT - Modifier une photo (remplacer l'image)
// =============================================================================
export async function PUT(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { id, imageUrl } = body;

    if (!id || !imageUrl) {
      return NextResponse.json({ error: "ID et imageUrl requis" }, { status: 400 });
    }

    const photo = await prisma.photoSlot.update({
      where: { id },
      data: { imageUrl },
    });

    return NextResponse.json(photo);
  } catch (error) {
    console.error("Erreur PUT photo:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// =============================================================================
// POST - Réordonner les photos d'une page
// =============================================================================
export async function POST(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { page, orderedIds } = body; // Array des IDs dans le nouvel ordre

    if (!page || !orderedIds || !Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    // Mettre à jour l'ordre de chaque photo
    const updates = orderedIds.map((id: string, index: number) =>
      prisma.photoSlot.update({
        where: { id },
        data: { ordre: index },
      })
    );

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur reorder photos:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
