// eslint.config.js (FLAT CONFIG)
import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tseslint from "typescript-eslint";
// import eslintPluginImport from 'eslint-plugin-import'; // A integração pode precisar de ajustes
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  // Configuração Global Inicial - Ignorados e Globals
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/coverage/**",
      // Adicione outros padrões para ignorar se necessário
    ],
    languageOptions: {
      globals: {
        ...globals.browser, // Globals para ambiente de navegador (frontend)
        ...globals.node, // Globals para ambiente Node.js (backend, scripts)
        ...globals.es2021,
      },
    },
  },

  // Configuração base do ESLint
  js.configs.recommended,

  // Configuração base do TypeScript ESLint
  ...tseslint.configs.recommended,

  // Configurações para React (aplicadas a arquivos JS/JSX/TS/TSX em apps/frontend)
  {
    files: ["apps/frontend/**/*.{js,jsx,ts,tsx}"],
    ...reactRecommended,
    ...reactJsxRuntime, // Remove a necessidade de 'import React' em todo lugar
    settings: {
      react: {
        version: "detect", // Detecta a versão do React instalada
      },
    },
  },

  // Configuração para React Hooks (aplicada aos mesmos arquivos)
  {
    files: ["apps/frontend/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // Configuração para Acessibilidade JSX (aplicada aos mesmos arquivos)
  {
    files: ["apps/frontend/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },

  // Configuração Prettier (IMPORTANTE: deve ser a ÚLTIMA para sobrescrever regras de estilo)
  prettierConfig,

  // Suas regras customizadas podem vir aqui, se necessário
  // Exemplo:
  // {
  //   rules: {
  //     'no-unused-vars': 'warn', // Exemplo de regra customizada
  //   }
  // }
);
