# CLAUDE.md

Ce fichier fournit des instructions à Claude Code (claude.ai/code) pour travailler avec le code de ce dépôt.

## Commandes

```bash
npm run dev       # Démarrer le serveur de développement Vite sur http://localhost:5173
npm run build     # Compilation TypeScript (tsc -b) puis build Vite → dist/
npm run lint      # ESLint avec les règles React/TypeScript
npm run preview   # Prévisualiser le build de production en local
```

Aucun outil de test n'est configuré.

## Architecture

**NaatalVote** est un frontend de plateforme de vote en ligne basé sur React 19 + TypeScript, avec quatre rôles utilisateurs distincts, chacun ayant sa propre interface complète :

- **CITOYEN** : Parcourir les élections → sélectionner un candidat → confirmer le vote → reçu avec jeton anonyme → consulter les résultats
- **ADMIN** : Créer/gérer les élections et les candidats, consulter les statistiques et rapports
- **OPERATEUR** (Opérateur anti-fraude) : Surveiller les alertes de fraude, investiguer les activités suspectes, recommander des suspensions d'utilisateurs
- **SUPERADMIN** : Gérer tous les utilisateurs, approuver/rejeter les demandes de suspension, consulter les journaux d'audit, exporter les données

### Routage (`src/App.tsx`)
21 routes regroupées par rôle : `/`, `/login`, `/otp`, `/register`, `/portal` (redirection selon le rôle), puis `/citoyen/*`, `/admin/*`, `/operateur/*`, `/superadmin/*`.

### Couche de données (`src/data/`)
Toutes les données sont actuellement **fictives uniquement** — aucun appel à une API backend. `mockData.json` contient tous les utilisateurs, élections, votes, alertes et journaux. `mockData.ts` définit tous les types TypeScript et les fonctions utilitaires (ex. `findUserByCNI`, `validateOTP`). Pour l'intégration backend, `BACKEND_SPECIFICATIONS.md` définit les 28 endpoints API.

### Modèles de données clés
- **Vote** : Utilise un système de jeton anonyme (`V-YYYY-NNNN`) — le vote est enregistré sans lien avec l'identité de l'électeur
- **TraceVote** : Indique *si* un citoyen a voté (empêche le double vote), séparément de *pour qui* il a voté
- **AlerteFraude** : Alertes de fraude avec workflow d'investigation entre les rôles OPERATEUR et SUPERADMIN
- **ActionLog** : Piste d'audit complète avec type d'action, utilisateur, horodatage, IP et signature cryptographique

### Styles
Tous les styles sont gérés via **styled-components** (CSS-in-JS). Les variables de thème globales et les animations keyframe se trouvent dans `src/styles/GlobalStyle.tsx`. Aucun fichier `.css` séparé par composant. Couleur principale : `rgba(31, 90, 51, 0.8)` (vert NaatalVote).

### Mise en page
`src/components/AppLayout.tsx` encapsule toutes les pages authentifiées en fournissant la navigation latérale avec les éléments de menu selon le rôle et les badges de notifications. Toutes les pages de chaque rôle importent ce layout.

### Processus de vote (2 étapes, irréversible)
`CitizenVote.tsx` → `CitizenVoteConfirm.tsx` (modale de confirmation SweetAlert2) → le backend enregistre le vote → `CitizenVoteReceipt.tsx` affiche le jeton anonyme.

## Stack technique

- **React 19** + **TypeScript 5.9** + **React Router DOM 7**
- **Vite 7** (bundler et serveur de développement)
- **styled-components 6** (tous les styles)
- **SweetAlert2** (modales de confirmation)
- **React Transition Group** (animations de page)
- Bootstrap Icons (CDN dans `index.html`)
- Google Fonts : Poppins (interface), Abhaya Libre (titres) — chargés via CDN dans `index.html`


