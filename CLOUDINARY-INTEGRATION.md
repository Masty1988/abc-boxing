# 🖼️ Intégration Cloudinary - Images Dynamiques

## ✅ Ce qui a été fait

### 1. **Helper Cloudinary** (`src/lib/cloudinary.ts`)
- Fonction `getCloudinaryImage(fileName)` : Récupère une URL Cloudinary
- Fonction `getAllCloudinaryImages()` : Charge toutes les images d'un coup
- Cache en mémoire (5 min) pour optimiser les performances
- Fallback automatique vers `/images/{fileName}` si image non trouvée

### 2. **Mapping des images**
Correspondance entre anciens noms et slots Cloudinary :
```typescript
"abc-boxing.jpg" → "ui-logo-club"
"hero.jpg" → "ui-hero-accueil"
"choc.jpg" → "combat-gala-principal"
"kick.jpg" → "entrainement-technique"
"trophee.jpg" → "combat-champion-1"
"engage.jpg" → "entrainement-groupe-1"
"engage2.jpg" → "combat-champion-2"
"fede.jpg" → "entrainement-coach"
"officiel.jpg" → "ui-club-histoire"
```

### 3. **Fonction getImages()** (`src/lib/get-images.ts`)
- À utiliser dans les Server Components
- Retourne toutes les images du site
- Type safe avec interface `SiteImages`

### 4. **Pages mises à jour**
- ✅ `/club` : Server Component
- ✅ `/actualites` : Server Component
- ✅ `/galerie` : Server Component wrapper + Client Component

---

## 🚀 Prochaines étapes

### Étape 1 : Migrer Prisma
```bash
npx prisma migrate dev --name add-image-fields
npx prisma generate
```

### Étape 2 : Uploader les images initiales
Utiliser votre script existant `upload-photos.mjs` **OU** utiliser l'interface admin `/taz` pour uploader manuellement chaque slot.

⚠️ **IMPORTANT** : Les noms des slots Cloudinary doivent correspondre au mapping :
- `ui-logo-club.jpg` → va remplacer `abc-boxing.jpg`
- `ui-hero-accueil.jpg` → va remplacer `hero.jpg`
- etc.

### Étape 3 : Tester
```bash
npm run dev
```

1. Aller sur `/club` → Vérifier que les images s'affichent
2. Aller sur `/galerie` → Vérifier la galerie
3. Aller sur `/actualites` → Vérifier les posts

### Étape 4 : Tester l'admin
1. Se connecter à `/taz/login`
2. Aller sur l'onglet "Photos"
3. Remplacer une image (ex: "Hero Page d'Accueil")
4. Vérifier que le changement s'affiche sur le site

---

## 🔄 Comment ça marche ?

### Avant (images en dur)
```tsx
import { IMAGES } from "@/lib/constants";
<Image src={IMAGES.hero} /> // "/images/hero.jpg"
```

### Après (images Cloudinary)
```tsx
import { getImages } from "@/lib/get-images";
const IMAGES = await getImages();
<Image src={IMAGES.hero} /> // URL Cloudinary ou fallback
```

### Workflow admin
1. L'admin upload une image via `/taz` (onglet Photos)
2. Le fichier est uploadé sur Cloudinary avec `public_id = slot.id`
3. L'URL Cloudinary est sauvegardée dans PostgreSQL (table `SiteImage`)
4. Le cache est invalidé
5. Au prochain chargement de page, `getImages()` récupère la nouvelle URL

---

## 📦 Fichiers créés/modifiés

### Nouveaux fichiers
- `src/lib/cloudinary.ts` - Helpers Cloudinary
- `src/lib/get-images.ts` - Fonction getImages()
- `src/app/galerie/GalerieClient.tsx` - Client Component galerie

### Fichiers modifiés
- `src/app/club/page.tsx` - Converti en Server Component
- `src/app/actualites/page.tsx` - Converti en Server Component
- `src/app/galerie/page.tsx` - Converti en Server Component wrapper

---

## 🐛 Troubleshooting

### Les images ne s'affichent pas ?
1. Vérifier que la migration Prisma est faite
2. Vérifier que les images sont bien dans la BDD :
   ```sql
   SELECT key, url FROM "SiteImage";
   ```
3. Vérifier le mapping dans `src/lib/cloudinary.ts`

### Erreur "Image not found" ?
- Le fallback vers `/public/images/` devrait fonctionner
- Vérifier que les images locales existent toujours

### Le cache ne se rafraîchit pas ?
- Redémarrer le serveur dev
- Ou attendre 5 minutes (durée du cache)
- Ou appeler `invalidateImageCache()` après upload

---

## 💡 Bonus : Invalidation du cache après upload

Pour invalider le cache automatiquement après un upload, ajoutez dans `ImageSlot.tsx` :

```typescript
import { invalidateImageCache } from "@/lib/cloudinary";

// Après le PUT réussi :
await fetch("/api/admin/invalidate-cache", { method: "POST" });
```

Créez l'API route :
```typescript
// src/app/api/admin/invalidate-cache/route.ts
import { invalidateImageCache } from "@/lib/cloudinary";
export async function POST() {
  invalidateImageCache();
  return Response.json({ success: true });
}
```
