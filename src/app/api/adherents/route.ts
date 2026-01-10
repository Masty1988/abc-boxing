// src/app/api/adherents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentSeason } from "@/lib/utils/season";

// Vérifier l'authentification admin
async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return null;
}

// =============================================================================
// GET - Liste des adhérents
// =============================================================================
export async function GET(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const saison = searchParams.get("saison") || getCurrentSeason();
  const paye = searchParams.get("paye");
  const combattant = searchParams.get("combattant");

  try {
    const where: {
      saison: string;
      paye?: boolean;
      combattant?: boolean;
    } = { saison };

    if (paye !== null) {
      where.paye = paye === "true";
    }
    if (combattant !== null) {
      where.combattant = combattant === "true";
    }

    const adherents = await prisma.adherent.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Stats
    const stats = {
      total: adherents.length,
      payes: adherents.filter((a) => a.paye).length,
      enAttente: adherents.filter((a) => !a.paye).length,
      combattants: adherents.filter((a) => a.combattant).length,
      revenus: adherents.filter((a) => a.paye).reduce((sum, a) => sum + (a.montant || 0), 0),
    };

    return NextResponse.json({ adherents, stats });
  } catch (error) {
    console.error("Erreur GET adherents:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// =============================================================================
// POST - Créer un adhérent
// =============================================================================
export async function POST(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { nom, prenom, email, telephone, categorie, discipline, formule, combattant } = body;

    if (!nom || !prenom) {
      return NextResponse.json({ error: "Nom et prénom requis" }, { status: 400 });
    }

    // Calculer le montant selon la formule
    const tarifs: Record<string, Record<string, number>> = {
      ADULTE: {
        LOISIR_BF_K1: 145,
        COMPETITION_BF: 180,
        COMPETITION_K1: 200,
        COMPETITION_BF_K1: 250,
      },
      ENFANT: {
        LOISIR_BF: 105,
        COMPETITION_BF: 125,
      },
    };

    const tarifKey = `${formule}_${discipline}`;
    const montant = tarifs[categorie]?.[tarifKey] || tarifs[categorie]?.[`LOISIR_${discipline}`] || 145;

    const adherent = await prisma.adherent.create({
      data: {
        nom,
        prenom,
        email,
        telephone,
        categorie: categorie || "ADULTE",
        discipline: discipline || "BF",
        formule: formule || "LOISIR",
        combattant: combattant || false,
        montant,
        paye: false,
      },
    });

    return NextResponse.json(adherent, { status: 201 });
  } catch (error) {
    console.error("Erreur POST adherent:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
