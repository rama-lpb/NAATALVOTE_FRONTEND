# NATAALVOTE Frontend

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

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## Structure du projet

- `src/components` : Composants réutilisables (Header, Hero, etc.)
- `src/pages` : Pages principales de l’application
- `src/assets` : Images, SVG, vidéos, etc.
- `src/hooks` : Hooks personnalisés
- `src/styles` : Styles globaux ou utilitaires
- `src/utils` : Fonctions utilitaires

## Technologies principales
- React 18 + TypeScript
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

© 2026 NATAALVOTE
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
