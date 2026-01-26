# 📸 Placeholder Images

## Problème Identifié

Les galeries du **Ring** et de la **Salle** affichent un écran gris/noir car :

1. Les slots Cloudinary ne sont pas encore remplis :
   - `salle-vue-generale`
   - `salle-sacs`
   - `salle-ring`
   - `salle-entrainement-1`
   - `ring-combat-1`
   - `ring-combat-2`
   - `ring-victoire-1`
   - `ring-podium-1`

2. Le fichier `placeholder.jpg` n'existe pas dans `/public/images/`

## Solution

### Option 1 : Upload des photos sur Cloudinary (RECOMMANDÉ)

Via le dashboard `/taz` :
1. Aller dans l'onglet "Photos"
2. Uploader les photos dans les slots correspondants
3. Les galeries se rempliront automatiquement

### Option 2 : Créer un vrai placeholder.jpg

Créer une image 1200x800px avec texte "Photo à venir" et logo ABC Boxing.

## Slots Cloudinary à Remplir

### Galerie Palmarès ✅
- `palmares-trophees-1` → Photo trophées (1/3)
- `palmares-trophees-2` → Photo trophées (2/3)
- `palmares-trophees-3` → Photo trophées (3/3)
- `palmares-medailles-1` → Photo médailles

### Galerie Salle ❌
- `salle-vue-generale` → Vue d'ensemble de la salle
- `salle-sacs` → Sacs de frappe
- `salle-ring` → Ring d'entraînement
- `salle-entrainement-1` → Séance d'entraînement

### Galerie Ring ❌
- `ring-combat-1` → Combat (1/2)
- `ring-combat-2` → Combat (2/2)
- `ring-victoire-1` → Victoire / Levée de bras
- `ring-podium-1` → Podium / Remise de médailles

### Images Couverture (Déjà utilisées)
- `ui-trophees` → Couverture galerie Palmarès ✅
- `entrainement-groupe-1` → Couverture galerie Salle ✅
- `combat-champion-1` → Couverture galerie Ring ✅

## Notes Techniques

- Format recommandé : JPG
- Taille : 1200x800px minimum
- Poids : < 500KB après compression
- Les images sont automatiquement optimisées par Cloudinary
