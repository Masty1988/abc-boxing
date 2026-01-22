export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateInscriptionPDF } from "@/lib/pdf-generator";
import type { InscriptionData } from "@/lib/types";

// ⚠️ IMPORTANT: Ajouter cette variable dans .env
// RESEND_API_KEY=re_...


export async function POST(request: NextRequest) {
  try {
const resend = new Resend(process.env.RESEND_API_KEY);
    const data: InscriptionData = await request.json();

    // Validation basique
    if (!data.prenom || !data.nom || !data.email || !data.telephone) {
      return NextResponse.json(
        { error: "Informations manquantes" },
        { status: 400 }
      );
    }

    // Générer le PDF
    const pdfBytes = await generateInscriptionPDF(data);

    // Convertir en base64 pour l'envoi par email
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    // Préparer le nom du fichier PDF
    const pdfFilename = `inscription_${data.nom}_${data.prenom}_${Date.now()}.pdf`;

    // Envoyer l'email à Vincent avec le PDF en pièce jointe
    const emailResult = await resend.emails.send({
      from: "ABC Boxing <service-client@mail.abcboxing.fr>", // Vrai domaine configuré sur Resend
      to: ["contact@abcboxing.fr"], // Email de Vincent
      subject: `🥊 Nouvelle inscription - ${data.prenom} ${data.nom} - ${data.tarifName} - En attente de paiement`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ef4444;">🥊 Nouvelle demande d'inscription</h1>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Informations de l'adhérent</h2>
            <p><strong>Nom:</strong> ${data.nom}</p>
            <p><strong>Prénom:</strong> ${data.prenom}</p>
            <p><strong>Date de naissance:</strong> ${data.dateNaissance}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Téléphone:</strong> ${data.telephone}</p>
            <p><strong>Adresse:</strong> ${data.adresse}, ${data.codePostal} ${data.ville}</p>
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Formule choisie</h2>
            <p><strong>${data.tarifName}</strong></p>
            <p><strong>Montant:</strong> ${data.price}€</p>
            <p><strong>Catégorie:</strong> ${data.category === "adultes" ? "Adultes" : "Enfants"}</p>
          </div>

          ${
            data.category === "enfants" && data.responsableNom
              ? `
          <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Responsable légal</h2>
            <p><strong>Nom:</strong> ${data.responsableNom}</p>
            <p><strong>Prénom:</strong> ${data.responsablePrenom || ""}</p>
            <p><strong>Téléphone:</strong> ${data.responsableTelephone || ""}</p>
            <p><strong>Email:</strong> ${data.responsableEmail || ""}</p>
          </div>
          `
              : ""
          }

          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <p style="margin: 0;"><strong>⚠️ Statut: EN ATTENTE DE PAIEMENT</strong></p>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Le formulaire d'inscription complet est joint en PDF.<br>
            Envoyé depuis le site ABC Boxing La Rochelle mamène !
          </p>
        </div>
      `,
      attachments: [
        {
          filename: pdfFilename,
          content: pdfBase64,
        },
      ],
    });

    if (emailResult.error) {
      console.error("Erreur envoi email:", emailResult.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inscription envoyée avec succès",
    });
  } catch (error) {
    console.error("Erreur API inscription:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'inscription" },
      { status: 500 }
    );
  }
}
