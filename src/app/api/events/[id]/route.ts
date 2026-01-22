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
// PATCH - Modifier un événement
// =============================================================================
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const { id } = params;
    const body = await request.json();
    const { titre, description, date, lieu, prix, imageUrl, lienReservation, publie } = body;

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(titre !== undefined && { titre }),
        ...(description !== undefined && { description }),
        ...(date !== undefined && { date: new Date(date) }),
        ...(lieu !== undefined && { lieu }),
        ...(prix !== undefined && { prix: prix ? parseFloat(prix) : null }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(lienReservation !== undefined && { lienReservation }),
        ...(publie !== undefined && { publie }),
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Erreur PATCH event:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// =============================================================================
// DELETE - Supprimer un événement
// =============================================================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const { id } = params;

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE event:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
