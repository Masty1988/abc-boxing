# 📸 Configuration Image Manager - ABC Boxing

## ✅ Ce qui a été créé

### 1. **Schéma Prisma mis à jour** (`prisma/schema.prisma`)
- Ajout des champs : `format`, `width`, `height`, `category` à `SiteImage`

### 2. **Configuration des slots** (`src/config/site-images.ts`)
- 10 slots prédéfinis (Hero, Logo, Photos combat, etc.)
- Types TypeScript complets
- Helpers pour récupérer les slots

### 3. **API Routes**
- `POST /api/admin/cloudinary-signature` : Génère signature sécurisée
- `GET /api/admin/site-images` : Liste toutes les images
- `PUT /api/admin/site-images` : Upsert une image après upload

### 4. **Composants React**
- `ImageSlot.tsx` : Composant individuel avec upload
- `ImageManager.tsx` : Vue principale avec filtres par catégorie

### 5. **Intégration Dashboard**
- Onglet "Photos" dans `/taz` fonctionnel
- Import du composant `ImageManager`

---

## 🚀 Étapes pour activer

### Étape 1 : Migrer la base de données
```bash
npx prisma migrate dev --name add-image-fields
npx prisma generate
```

### Étape 2 : Vérifier les variables d'environnement
Assurez-vous que `.env` contient :
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DATABASE_URL=your_postgres_url
```

### Étape 3 : Tester l'interface
1. Lancez le serveur : `npm run dev`
2. Connectez-vous à `/taz/login`
3. Cliquez sur l'onglet "Photos"
4. Vous devriez voir les 10 slots d'images

### Étape 4 : Tester l'upload
1. Cliquez sur "Remplacer l'image" sur un slot
2. Sélectionnez une image (max 10MB)
3. L'upload se fait directement sur Cloudinary
4. L'URL est mise à jour dans PostgreSQL
5. L'image est remplacée sur le site

---

## 🔒 Sécurité

✅ **Authentification requise** : Toutes les API routes vérifient `getServerSession()`
✅ **Signature forcée** : Le `public_id` est imposé par le serveur (= slot.id)
✅ **Overwrite activé** : Impossible de créer de nouveaux fichiers
✅ **Slots en dur** : Liste figée dans `site-images.ts`

---

## 📝 Comment ajouter un nouveau slot ?

1. Ouvrir `src/config/site-images.ts`
2. Ajouter un objet dans `EDITABLE_IMAGES` :
```typescript
{
  id: "ui-nouveau-slot", // ⚠️ Unique et sans espaces
  label: "Mon nouveau slot",
  description: "Description pour l'admin",
  category: "UI",
  width: 1200,
  height: 800,
}
```
3. C'est tout ! Pas de migration nécessaire

---

## 🐛 Debug

### L'upload échoue ?
- Vérifier les variables d'environnement Cloudinary
- Vérifier que l'admin est bien connecté (session NextAuth)
- Regarder la console du navigateur pour les erreurs

### L'image ne s'affiche pas après upload ?
- Vérifier que l'URL dans PostgreSQL est correcte
- Vérifier que le `public_id` Cloudinary correspond au `slot.id`
- Purger le cache navigateur (Ctrl+Shift+R)

### Les slots sont vides ?
- Normal si aucune image n'a été uploadée
- Utilisez votre script `upload-photos.mjs` pour remplir initialement

---

## 📦 Structure des fichiers créés

```
src/
├── config/
│   └── site-images.ts              # Config des 10 slots
├── app/
│   ├── api/
│   │   └── admin/
│   │       ├── cloudinary-signature/
│   │       │   └── route.ts        # Signature upload
│   │       └── site-images/
│   │           └── route.ts        # GET/PUT images
│   └── taz/
│       └── page.tsx                # Dashboard (modifié)
└── components/
    └── admin/
        ├── ImageManager.tsx        # Vue principale
        └── ImageSlot.tsx           # Slot individuel
```

---

## 🎯 Prochaines étapes (optionnel)

- [ ] Ajouter un aperçu avant upload
- [ ] Afficher les dimensions réelles de l'image actuelle
- [ ] Ajouter un bouton "Restaurer image d'origine"
- [ ] Logger les uploads dans une table `ImageHistory`
