// src/app/api/adherents/[id]/route.ts
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

// Liste blanche des champs modifiables (évite mass assignment)
const ALLOWED_UPDATE_FIELDS = [
  "nom",
  "prenom",
  "email",
  "telephone",
  "photo",
  "numeroLicence",
  "categorie",
  "discipline",
  "formule",
  "combattant",
  "paye",
  "montant",
  "methodePaiement",
  "datePaiement",
  "saison",
] as const;

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { id } = await params;

  try {
    const body = await request.json();

    // Filtrer uniquement les champs autorisés (protection mass assignment)
    const sanitizedData: Record<string, unknown> = {};
    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (field in body) {
        sanitizedData[field] = body[field];
      }
    }

    const adherent = await prisma.adherent.update({
      where: { id },
      data: {
        ...sanitizedData,
        updatedAt: new Date(),
      },
    });

    // Revalider la page club qui affiche le compteur d'adhérents
    revalidatePath("/club");

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

    // Revalider la page club qui affiche le compteur d'adhérents
    revalidatePath("/club");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE adherent:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
