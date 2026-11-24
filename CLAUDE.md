# NAATALVOTE frontend

Interface React 19, TypeScript et Vite reliée à l’API REST Spring Boot via `src/services/api.ts`. Les données métier sont chargées depuis le backend ; le registre AppDAFF et les SMS restent simulés dans la démonstration.

## Commandes

- `npm ci` : installation reproductible.
- `npm run lint -- --max-warnings 0` : contrôle bloquant.
- `npm run build` : TypeScript, build de production et manifeste `version.json`.
- `npm run dev` : serveur local, proxy `/api` vers le backend local.

Les routes protégées utilisent `RequireRole`. Cette garde ne remplace pas les autorisations du serveur. Quatre rôles sont présents : CITOYEN, ADMIN, OPERATEUR et SUPERADMIN.

La vérification du reçu ne renvoie aucun candidat. Le reçu n’est pas une preuve cryptographique de bout en bout. Les résultats sont calculés à partir des bulletins. Ne pas inventer de statistiques démographiques, de score de risque ou de signature.

## Démonstration

`VITE_DEMO_MODE=true` affiche un bandeau permanent. `VITE_API_ORIGIN` désigne l’API ; `VITE_BUILD_SHA` identifie le commit. Les secrets n’entrent jamais dans les variables Vite exposées au navigateur.

Les tests navigateur et leurs captures sont distincts du build. Les limites et les preuves exécutées sont documentées dans le dossier de livraison ESP 221.
