// src/app/api/adherents/[id]/route.ts
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
// GET - Détail d'un adhérent
// =============================================================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { id } = await params;

  try {
    const adherent = await prisma.adherent.findUnique({
      where: { id },
    });

    if (!adherent) {
      return NextResponse.json({ error: "Adhérent non trouvé" }, { status: 404 });
    }

    return NextResponse.json(adherent);
  } catch (error) {
    console.error("Erreur GET adherent:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// =============================================================================
// PUT - Modifier un adhérent
// =============================================================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { id } = await params;

  try {
    const body = await request.json();

    const adherent = await prisma.adherent.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(adherent);
  } catch (error) {
    console.error("Erreur PUT adherent:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// =============================================================================
// DELETE - Supprimer un adhérent
// =============================================================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { id } = await params;

  try {
    await prisma.adherent.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE adherent:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
