# Cocktail App

This is a React project that allows users to explore and search for cocktails using the [CocktailDB API](https://www.thecocktaildb.com/). Users can view random cocktails, search for specific cocktails, and manage a list of favorite cocktails with persistent storage using `localStorage`.

## Features

### 1. Home Page
- **View Random Cocktails**: When a user arrives on the home page, they can view 5 random cocktails.
- **Refresh Button**: Users can click the "Refresh" button to load another 5 random cocktails.
- **Cocktail Details**: Each cocktail card displays the cocktail's name, image, and category.
- **Search for Cocktails**: Users can search for cocktails by name.
- **Add to Favorites**: Search results display an "Add" button that allows users to add cocktails to their favorites 

### 2. Favorites Page
- **View Favorites**: Users can view a list of their favorite cocktails.
- **Remove from Favorites**: Each favorite cocktail card displays a "Remove" button, allowing users to remove it from the favorites list.
- **Persistent Storage**: The favorites list is stored in `localStorage` to ensure persistence across page reloads.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
