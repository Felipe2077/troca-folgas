// .eslintrc.js
module.exports = {
  root: true,
  // Extends combinam conjuntos de regras recomendadas
  extends: [
    'eslint:recommended', // Regras básicas do ESLint
    'plugin:@typescript-eslint/recommended', // Regras para TypeScript
    'plugin:react/recommended', // Regras para React
    'plugin:react-hooks/recommended', // Regras para React Hooks
    'plugin:jsx-a11y/recommended', // Regras de acessibilidade JSX
    'turbo', // Regras específicas do Turborepo (ex: dependências)
    'prettier', // Desativa regras do ESLint que conflitam com Prettier (IMPORTANTE: deve ser o último)
  ],
  // Parser para entender TypeScript
  parser: '@typescript-eslint/parser',
  // Plugins adicionam as regras que usamos nos extends
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import'],
  // Configurações específicas
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React
    },
  },
  // Ambientes onde o código rodará
  env: {
    browser: true, // Para código frontend
    node: true, // Para código backend e scripts
    es2021: true,
  },
  // Ignora arquivos/pastas (alternativa/complemento ao .eslintignore)
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.next/',
    '.turbo/',
    'coverage/',
  ],
  rules: {
    // Aqui você pode adicionar ou sobrescrever regras específicas se necessário
    // Exemplo: Desativar uma regra específica do React
    // 'react/react-in-jsx-scope': 'off', // Não necessário com React 17+ e Next.js
    // Exemplo: Regra para ordem de imports (plugin eslint-plugin-import)
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    // Adicione outras regras conforme necessário
  },
};