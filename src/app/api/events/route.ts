import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Vérifier l'authentification admin
async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return null;
}

// =============================================================================
// GET - Liste des événements (publique ou admin)
// =============================================================================
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const adminMode = searchParams.get("admin") === "true";

  try {
    // Si mode admin, vérifier l'auth
    if (adminMode) {
      const authError = await checkAuth();
      if (authError) return authError;

      // Admin voit tous les événements
      const events = await prisma.event.findMany({
        orderBy: { date: "asc" },
      });
      return NextResponse.json({ events });
    }

    // Public : seulement les événements publiés et à venir
    const now = new Date();
    const events = await prisma.event.findMany({
      where: {
        publie: true,
        date: { gte: now },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Erreur GET events:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// =============================================================================
// POST - Créer un événement
// =============================================================================
export async function POST(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { titre, description, date, lieu, prix, imageUrl, lienReservation, publie } = body;

    if (!titre || !description || !date) {
      return NextResponse.json(
        { error: "Titre, description et date requis" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        titre,
        description,
        date: new Date(date),
        lieu: lieu || null,
        prix: prix ? parseFloat(prix) : null,
        imageUrl: imageUrl || null,
        lienReservation: lienReservation || null,
        publie: publie ?? true,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Erreur POST event:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
