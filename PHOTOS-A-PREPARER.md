# 📸 Liste des Photos à Préparer - ABC Boxing

Ce document liste toutes les photos à ajouter au site pour compléter la V1.

## 🎯 Photos Prioritaires

### Timeline Historique (6 photos)
**Localisation** : `/public/images/timeline/`
**Page** : [Notre Histoire](/galerie)
**Format** : 4:3 paysage, 1200x900px min, JPG < 500KB

- [ ] `fondation_2003.jpg` - Création du club (mars 2003)
- [ ] `direction_2005.jpg` - Vincent & Nathalie lors de la reprise (avril 2005)
- [ ] `mondial_2011.jpg` - Mélanie Lete avec ceinture mondiale 🏆
- [ ] `k1_2017.jpg` - Création section K-1, entraînement
- [ ] `france_2024.jpg` - Cali Joly en Guadeloupe, championnats de France 🏆
- [ ] `aujourdhui.jpg` - Photo récente du club, entraînement collectif

### Photos Staff (4 photos)
**Localisation** : `/public/images/staff/`
**Page** : [Notre Histoire](/galerie) - Section "L'Équipe ABC Boxing"
**Format** : 1:1 carré, 400x400px min, JPG < 200KB
**Cadrage** : Portrait centré, visage bien visible (affichage en rond)

- [ ] `staff_vincent.jpg` - Vincent (Coach / Arbitre Officiel)
- [ ] `staff_vanessa.jpg` - Vanessa (Préparateur physique)
- [ ] `staff_nathalie.jpg` - Nathalie (Présidente)
- [ ] `staff_maya.jpg` - Maya (Entraîneur Kickboxing)

**Activation** : Après upload, modifier `src/app/galerie/GalerieClient.tsx` ligne 172 : `const hasPhoto = true;`

---

## 🔄 Photos Dynamiques (via Dashboard)

Ces photos sont gérées via le dashboard admin (`/taz` → onglet Photos).

### Images UI
- **Hero Page d'Accueil** (`ui-hero-accueil`) - 1920x1080px
  - Changeable pour événements spéciaux (Octobre Rose, anniversaire, etc.)

- **Background Contact** (`ui-background-contact`) - 1920x1080px
  - Image de fond formulaire contact

- **Histoire du Club** (`ui-club-histoire`) - 800x600px
  - Illustration section histoire

- **Logo Club** (`ui-logo-club`) - 400x400px
  - Logo ABC Boxing (header)

- **Trophées/Palmarès** (`ui-trophees`) - 1200x800px
  - Photo trophées, ceintures, médailles

### Images Combat
- **Photo Gala Principale** (`combat-gala-principal`) - 1200x800px
- **Champion #1** (`combat-champion-1`) - 600x800px
- **Champion #2** (`combat-champion-2`) - 600x800px

### Images Entraînement
- **Entraînement Groupe #1** (`entrainement-groupe-1`) - 1200x800px
- **Photo Coach Principal** (`entrainement-coach`) - 800x800px
- **Technique BF/K1** (`entrainement-technique`) - 1200x800px

**Upload** : Se connecter au dashboard `/taz` → onglet "Photos" → Upload sur Cloudinary

---

## 📝 Instructions Upload

### Photos statiques (Timeline & Staff)
1. Préparer les photos au bon format
2. Renommer exactement selon les noms ci-dessus
3. Copier dans le dossier approprié :
   - Timeline → `public/images/timeline/`
   - Staff → `public/images/staff/`
4. Pour le staff, activer dans le code (voir README du dossier)

### Photos dynamiques (Cloudinary)
1. Se connecter au dashboard : `http://localhost:3001/taz`
2. Onglet "Photos"
3. Cliquer sur un slot pour uploader/remplacer
4. La photo apparaît immédiatement sur le site

---

## ✅ État actuel

### Timeline
- ✅ Code prêt avec emplacements photos
- ⚠️ Placeholders (logo ABC) en place
- ❌ Photos réelles à ajouter

### Staff
- ✅ Code prêt avec fallback initiales
- ⚠️ Affichage désactivé (hasPhoto = false)
- ❌ Photos réelles à ajouter + activation

### Slots Cloudinary
- ✅ Système opérationnel
- ✅ Dashboard de gestion fonctionnel
- ⏳ Photos à uploader au fil du temps

---

## 🎨 Conseils Photos

### Timeline
- Privilégier photos authentiques (archives)
- Qualité acceptable même pour anciennes photos
- Cadrage horizontal (paysage)
- Bonne luminosité

### Staff
- Photos professionnelles mais chaleureuses
- Fond neutre ou salle de boxe
- Sourire / expression engageante
- Cadrage serré sur le visage (affichage petit)

### Cloudinary
- Photos haute qualité pour le hero
- Action, dynamisme pour entraînements
- Fierté, victoire pour combats/champions
- Compression web avant upload (< 500KB)

---

**Dernière mise à jour** : 10 janvier 2026
