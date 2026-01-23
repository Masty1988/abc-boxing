// src/app/api/stripe/webhook/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";



export async function POST(request: NextRequest) {
  
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  // Gérer les événements Stripe
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Récupérer l'ID adhérent depuis les metadata
      const adherentId = session.metadata?.adherentId;
      
      if (adherentId) {
        // Mettre à jour l'adhérent comme payé
        await prisma.adherent.update({
          where: { id: adherentId },
          data: {
            paye: true,
            methodePaiement: "STRIPE",
            stripePaymentId: session.payment_intent as string,
            datePaiement: new Date(),
          },
        });

        console.log(`✅ Paiement validé pour adhérent ${adherentId}`);
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`❌ Paiement échoué: ${paymentIntent.id}`);
      break;
    }

    default:
      console.log(`Event non géré: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
