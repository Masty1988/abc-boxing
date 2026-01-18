// src/app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// =============================================================================
// POST - Créer une session de paiement Stripe
// =============================================================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adherentId, formule, montant, email } = body;

    if (!adherentId || !montant) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    // Vérifier que l'adhérent existe
    const adherent = await prisma.adherent.findUnique({
      where: { id: adherentId },
    });

    if (!adherent) {
      return NextResponse.json({ error: "Adhérent non trouvé" }, { status: 404 });
    }

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email || adherent.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Licence ABC Boxing - ${formule || adherent.formule}`,
              description: `Saison ${adherent.saison} - ${adherent.prenom} ${adherent.nom}`,
            },
            unit_amount: Math.round(montant * 100), // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      metadata: {
        adherentId: adherent.id,
        type: "licence",
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/inscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/inscription?canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Erreur Stripe checkout:", error);
    return NextResponse.json({ error: "Erreur création paiement" }, { status: 500 });
  }
}
