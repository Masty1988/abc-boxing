// src/app/api/adherents/[id]/validate-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { methode } = body; // "ESPECES", "CHEQUE", "VIREMENT"

    const adherent = await prisma.adherent.update({
      where: { id },
      data: {
        paye: true,
        methodePaiement: methode || "ESPECES",
        datePaiement: new Date(),
      },
    });

    // TODO: Générer facture PDF ici
    // const facturePdf = await generateFacture(adherent);

    return NextResponse.json({
      success: true,
      adherent,
      message: `Paiement validé pour ${adherent.prenom} ${adherent.nom}`,
      // factureUrl: facturePdf.url
    });
  } catch (error) {
    console.error("Erreur validation paiement:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
