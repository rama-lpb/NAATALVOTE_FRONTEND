# NAATALVOTE Frontend

Ce projet est une application React moderne, structurée selon les principes du clean code, pour l’intégration de maquettes d’une plateforme de vote en ligne.

## Démarrage rapide

1. **Installer les dépendances**

```bash
npm install
```

2. **Lancer le serveur de développement**

```bash
npm run dev
```

3. **Accéder à l’application**

Ouvrez `http://localhost:5173` dans votre navigateur.

## Configuration API (backend)

- En dev, `vite.config.ts` proxifie `/api` vers `http://localhost:8080`.
- En prod (frontend + backend sur 2 serveurs différents), définissez `VITE_API_ORIGIN` au build (ex: `https://naatalvote-backend.onrender.com`).
  - Exemple : copiez `.env.example` vers `.env` et renseignez `VITE_API_ORIGIN`.

## Structure du projet

- `src/components` : Composants réutilisables (Header, Hero, etc.)
- `src/pages` : Pages principales de l’application
- `src/assets` : Images, SVG, vidéos, etc.
- `src/hooks` : Hooks personnalisés
- `src/styles` : Styles globaux ou utilitaires
- `src/utils` : Fonctions utilitaires

## Technologies principales
- React + TypeScript
- Vite
- Styled Components
- React Router DOM

## Personnalisation
- Remplacez le logo SVG et la vidéo de fond par vos propres fichiers dans `src/assets` et `public/`
- Ajoutez vos pages dans `src/pages` et vos composants dans `src/components`

## Prochaines étapes
- Ajouter la gestion d’état globale si besoin (ex: Zustand, Redux...)
- Ajouter l’authentification et la navigation multi-pages

---

© 2026 NAATALVOTE
