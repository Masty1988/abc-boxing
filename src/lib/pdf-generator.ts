import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { InscriptionData } from "./types";
import { getSeasonLabel } from "./utils/season";

export async function generateInscriptionPDF(data: InscriptionData): Promise<Uint8Array> {
  const seasonLabel = getSeasonLabel();

  // Créer un nouveau document PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 format
  const { width, height } = page.getSize();

  // Charger les fonts
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let yPosition = height - 50;

  // En-tête
  page.drawText("ABC BOXING LA ROCHELLE", {
    x: 50,
    y: yPosition,
    size: 20,
    font: fontBold,
    color: rgb(0.9, 0.26, 0.26), // Rouge
  });

  yPosition -= 25;
  page.drawText(`FORMULAIRE D'INSCRIPTION - ${seasonLabel}`, {
    x: 50,
    y: yPosition,
    size: 12,
    font: fontBold,
  });

  yPosition -= 40;

  // Informations sur la formule
  page.drawText("FORMULE CHOISIE", {
    x: 50,
    y: yPosition,
    size: 14,
    font: fontBold,
  });

  yPosition -= 20;
  page.drawText(`${data.tarifName}`, {
    x: 50,
    y: yPosition,
    size: 12,
    font: fontRegular,
  });

  yPosition -= 15;
  page.drawText(`Montant: ${data.price}€`, {
    x: 50,
    y: yPosition,
    size: 12,
    font: fontBold,
    color: rgb(0.9, 0.26, 0.26),
  });

  yPosition -= 15;
  page.drawText(`Catégorie: ${data.category === "adultes" ? "Adultes" : "Enfants"}`, {
    x: 50,
    y: yPosition,
    size: 10,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4),
  });

  yPosition -= 40;

  // Informations personnelles
  page.drawText("INFORMATIONS PERSONNELLES", {
    x: 50,
    y: yPosition,
    size: 14,
    font: fontBold,
  });

  yPosition -= 25;

  const personalInfo = [
    { label: "Nom:", value: data.nom },
    { label: "Prénom:", value: data.prenom },
    { label: "Date de naissance:", value: data.dateNaissance },
    { label: "Email:", value: data.email },
    { label: "Téléphone:", value: data.telephone },
    { label: "Adresse:", value: data.adresse },
    { label: "Code postal:", value: data.codePostal },
    { label: "Ville:", value: data.ville },
  ];

  for (const info of personalInfo) {
    page.drawText(info.label, {
      x: 50,
      y: yPosition,
      size: 10,
      font: fontBold,
    });

    page.drawText(info.value, {
      x: 150,
      y: yPosition,
      size: 10,
      font: fontRegular,
    });

    yPosition -= 18;
  }

  // Responsable légal si enfant
  if (data.category === "enfants" && data.responsableNom) {
    yPosition -= 20;

    page.drawText("RESPONSABLE LÉGAL", {
      x: 50,
      y: yPosition,
      size: 14,
      font: fontBold,
    });

    yPosition -= 25;

    const responsableInfo = [
      { label: "Nom:", value: data.responsableNom },
      { label: "Prénom:", value: data.responsablePrenom || "" },
      { label: "Téléphone:", value: data.responsableTelephone || "" },
      { label: "Email:", value: data.responsableEmail || "" },
    ];

    for (const info of responsableInfo) {
      page.drawText(info.label, {
        x: 50,
        y: yPosition,
        size: 10,
        font: fontBold,
      });

      page.drawText(info.value, {
        x: 150,
        y: yPosition,
        size: 10,
        font: fontRegular,
      });

      yPosition -= 18;
    }
  }

  yPosition -= 40;

  // Statut de paiement
  page.drawRectangle({
    x: 40,
    y: yPosition - 30,
    width: width - 80,
    height: 50,
    color: rgb(0.95, 0.95, 0.95),
  });

  page.drawText("STATUT: EN ATTENTE DE PAIEMENT", {
    x: 50,
    y: yPosition - 10,
    size: 12,
    font: fontBold,
    color: rgb(0.9, 0.5, 0.1),
  });

  yPosition -= 80;

  // Pied de page
  page.drawText("Gymnase Descartes, 101, Avenue de bourgorne, 17000 La Rochelle", {
    x: 50,
    y: 50,
    size: 8,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  page.drawText("Tél: 06 32 72 85 41 | contact@abcboxing.fr", {
    x: 50,
    y: 35,
    size: 8,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Sauvegarder le PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
