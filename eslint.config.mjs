import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import { configs as typescriptConfigs } from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended, // Base ESLint recommended rules
  reactPlugin.configs.recommended, // React recommended rules
  reactHooksPlugin.configs.recommended, // React hooks recommended rules
  typescriptConfigs.recommended, // TypeScript recommended rules
  prettierConfig, // Prettier configuration to disable conflicting rules

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-indent': ['error', 2],
      'react/jsx-wrap-multilines': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'warn',
      'spaced-comment': 'error',
      'prefer-const': 'error',
      'no-useless-constructor': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
      'no-duplicate-imports': 'error',
      'react/display-name': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
