# Dockerfile para apps/backend

    # ---- Base Stage ----
    # Usa uma imagem Node.js oficial como base. Escolha uma versão LTS.
    # Usar 'alpine' para imagens menores, mas pode ter menos ferramentas. 'slim' é um bom meio-termo.
    FROM node:20-slim AS base
    LABEL authors="Felipe"

    # Define o diretório de trabalho dentro do container
    WORKDIR /usr/src/app

    # Instala pnpm globalmente na imagem base
    RUN npm install -g pnpm

    # ---- Dependencies Stage ----
    # Este estágio foca em instalar dependências e pode ser cacheado se os lockfiles não mudarem.
    FROM base AS dependencies
    WORKDIR /usr/src/app

    # Copia os arquivos de manifesto de pacotes da RAIZ do monorepo e do backend
    # Isso é crucial para o pnpm workspaces funcionar corretamente
    COPY ../../pnpm-lock.yaml ./
    COPY ../../pnpm-workspace.yaml ./
    COPY package.json ./
    COPY ../../package.json ./package.json.root 

    # Instala APENAS as dependências de produção para o pacote 'backend'
    # O filtro '--prod' garante que devDependencies não sejam instaladas
    # O filtro '--filter backend' garante que só as dependências do backend (e suas deps compartilhadas) sejam instaladas
    RUN pnpm install --prod --filter backend

    # ---- Build Stage ----
    # Este estágio foca em buildar o código TypeScript para JavaScript.
    FROM base AS build
    WORKDIR /usr/src/app

    # Copia as dependências já instaladas do estágio anterior
    COPY --from=dependencies /usr/src/app/node_modules ./node_modules
    COPY --from=dependencies /usr/src/app/package.json ./package.json

    # Copia o restante do código fonte do backend e arquivos de configuração
    COPY . .
    # Copia o schema Prisma para dentro do contexto de build
    COPY prisma ./prisma

    # Gera o Prisma Client (essencial para o build e runtime)
    # Assume que DATABASE_URL não é necessária para 'generate', apenas para 'migrate' ou 'db push'
    # Se 'generate' precisar do .env, precisaria copiar o .env de produção aqui ou passar como build arg
    RUN pnpm exec prisma generate

    # Compila o código TypeScript para JavaScript
    # O tsconfig.json deve ter "outDir": "./dist"
    RUN pnpm build

    # ---- Production Stage ----
    # Este é o estágio final, que cria a imagem de produção leve.
    FROM base AS production
    WORKDIR /usr/src/app

    # Copia as dependências de produção do estágio 'dependencies'
    COPY --from=dependencies /usr/src/app/node_modules ./node_modules
    COPY --from=dependencies /usr/src/app/package.json ./package.json

    # Copia o código JavaScript buildado do estágio 'build'
    COPY --from=build /usr/src/app/dist ./dist
    # Copia o schema Prisma (necessário em runtime se o Prisma Client o lê)
    COPY --from=build /usr/src/app/prisma ./prisma
    # Copia o Prisma Client gerado para o local correto em node_modules
    # Este caminho deve corresponder ao 'output' no schema.prisma ou ao padrão do Prisma
    COPY --from=build /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client
    COPY --from=build /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client

    # Expõe a porta que a API vai usar (deve bater com BACKEND_PORT no .env)
    EXPOSE 3333

    # Comando para iniciar a aplicação em produção
    # Assume que o script 'start' no package.json do backend é 'node dist/server.js'
    CMD [ "pnpm", "start" ]
    