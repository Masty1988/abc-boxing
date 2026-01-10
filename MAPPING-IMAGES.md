# 📸 Guide des Images Cloudinary - SIMPLIFIÉ

## ✅ Nouveau système (simple et clair)

On utilise **directement les IDs Cloudinary** partout. Plus de mapping compliqué !

## 🎯 Tous les Slots Disponibles

| ID Cloudinary | Label Admin | Où c'est utilisé ? |
|--------------|-------------|-------------------|
| **ui-logo-club** | Logo du Club | Header du site |
| **ui-hero-accueil** | Hero Page d'Accueil | Image de fond page d'accueil |
| **ui-background-contact** | Background Section Contact | Fond formulaire contact |
| **ui-club-histoire** | Photo Histoire du Club | Mot du président (page Club) |
| **ui-trophees** | Photo Trophées/Palmarès | Section "Notre Palmarès" |
| **combat-gala-principal** | Photo Gala Principale | Page d'accueil - événement |
| **combat-champion-1** | Champion #1 | Actualités - post compétition |
| **combat-champion-2** | Champion #2 | (Disponible pour usage futur) |
| **entrainement-groupe-1** | Entrainement Groupe #1 | Actualités - post Octobre Rose |
| **entrainement-coach** | Photo Coach Principal | Actualités - post fédération |
| **entrainement-technique** | Technique BF/K1 | (Disponible pour usage futur) |

## 🔧 Comment changer une image ?

### Via l'Admin (RECOMMANDÉ)
1. Va sur `/admin/images`
2. Trouve le slot avec son **Label** (ex: "Photo Trophées/Palmarès")
3. Upload la nouvelle image
4. Elle remplace automatiquement sur le site

### Dans le code
Les pages utilisent maintenant **directement les IDs** :

```typescript
const IMAGES = await getImages();

// Avant (compliqué) ❌
<Image src={IMAGES.trophee} />

// Maintenant (simple) ✅
<Image src={IMAGES["ui-trophees"]} />
```

## 📝 Mapping actuel

### Page Club (`/club`)
- **Mot du président** : `ui-club-histoire`
- **Section Palmarès** : `ui-trophees`

### Page Actualités (`/actualites`)
- **Post Octobre Rose** : `entrainement-groupe-1` (photo action associative)
- **Post Championnes** : `combat-champion-1` (photo de combattantes)
- **Post Fédération** : `entrainement-coach` (photo formation)

## 💡 Conseil pour ajouter de nouvelles photos

Tu veux ajouter une nouvelle photo (ex: action associative) ?

**Option 1 : Utiliser un slot existant**
- Trouve un slot proche de ce que tu veux (ex: `entrainement-groupe-1`)
- Upload ta photo dessus dans l'admin
- Elle s'affichera automatiquement partout où ce slot est utilisé

**Option 2 : Créer un nouveau slot**
1. Édite `src/config/site-images.ts`
2. Ajoute un nouveau slot :
```typescript
{
  id: "action-octobre-rose",
  label: "Action Octobre Rose",
  description: "Photo de l'événement solidaire",
  category: "AUTRE",
  width: 1200,
  height: 800,
}
```
3. Ajoute-le dans `src/lib/get-images.ts`
4. Utilise-le dans tes pages : `IMAGES["action-octobre-rose"]`

## ⚠️ Note importante

Les slots **ne sont que des emplacements**. Tu peux :
- Mettre n'importe quelle photo dans n'importe quel slot
- Réutiliser le même slot à plusieurs endroits
- Changer les photos autant que tu veux via l'admin

**Exemple concret :**
Tu as une photo "Octobre Rose" que tu veux utiliser pour illustrer une action associative ?
→ Upload-la dans le slot `entrainement-groupe-1` via l'admin
→ Elle apparaîtra automatiquement dans la page actualités

C'est comme des "tiroirs" : peu importe le nom du tiroir, tu mets ce que tu veux dedans !
