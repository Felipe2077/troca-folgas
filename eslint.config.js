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
  
  {
    files: ['**/*.ts', '**/*.tsx'], // Aplica apenas a arquivos TypeScript
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error', // Mantém como erro, mas poderia ser 'warn' se preferir só um aviso
        {
          args: 'all', // Verifica todos os argumentos
          argsIgnorePattern: '^_', // IGNORA argumentos que começam com _
          vars: 'all', // Verifica todas as variáveis
          varsIgnorePattern: '^_', // IGNORA variáveis que começam com _
          caughtErrors: 'all', // Verifica erros capturados em try/catch
          caughtErrorsIgnorePattern: '^_', // IGNORA erros capturados que começam com _
          ignoreRestSiblings: true // Ignora "irmãos rest" ({ ...rest }) não usados
        },
      ],
      // Você pode adicionar outras regras customizadas aqui no futuro
    },
  },
  
 // Configuração Prettier (IMPORTANTE: deve ser a ÚLTIMA para sobrescrever regras de estilo)
  prettierConfig,
);
