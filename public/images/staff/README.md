# 👥 Photos Équipe - ABC Boxing

Ce dossier contient les photos des membres de l'équipe encadrante affichées sur la page **Notre Histoire** (`/galerie`).

## Images requises

| Fichier | Membre | Rôle |
|---------|--------|------|
| **staff_vincent.jpg** | Vincent | Coach / Arbitre Officiel |
| **staff_vanessa.jpg** | Vanessa | Préparateur physique |
| **staff_nathalie.jpg** | Nathalie | Présidente |
| **staff_maya.jpg** | Maya | Entraîneur Kickboxing |

## Format recommandé

- **Ratio** : 1:1 (carré) - pour affichage en rond
- **Dimensions** : 400x400px minimum
- **Format** : JPG
- **Poids** : < 200KB par image
- **Cadrage** : Portrait centré, visage bien visible

## Activation des photos

Les photos sont actuellement désactivées (affichage des initiales).

Pour activer l'affichage des photos :
1. Ajouter les 4 photos dans ce dossier avec les noms exacts ci-dessus
2. Dans `src/app/galerie/GalerieClient.tsx` ligne 172, changer :
   ```tsx
   const hasPhoto = false; // 🔧 Mettre à true quand les photos seront uploadées
   ```
   en :
   ```tsx
   const hasPhoto = true;
   ```

Les photos s'afficheront alors dans des cercles avec bordure rouge.

## Alternative : Photos individuelles

Si vous voulez activer les photos une par une, vous pouvez remplacer la ligne 172 par :
```tsx
const hasPhoto = [
  'vincent',
  'vanessa'
].includes(member.name.toLowerCase());
```

Cela affichera uniquement les photos de Vincent et Vanessa, et gardera les initiales pour les autres.
