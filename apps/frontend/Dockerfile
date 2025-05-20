    # Dockerfile para apps/frontend

    # ---- Base Stage ----
    # Imagem Node.js LTS. 'alpine' é bem pequena.
    FROM node:20-alpine AS base
    LABEL authors="Felipe & Gemini"

    # Define o diretório de trabalho
    WORKDIR /usr/src/app

    # Instala pnpm globalmente
    RUN npm install -g pnpm

    # ---- Dependencies Stage ----
    # Focado em instalar dependências, aproveitando cache do Docker.
    FROM base AS dependencies
    WORKDIR /usr/src/app

    # Copia arquivos de manifesto da RAIZ e do frontend
    COPY ../../pnpm-lock.yaml ./
    COPY ../../pnpm-workspace.yaml ./
    COPY package.json ./
    COPY ../../package.json ./package.json.root

    # Instala APENAS dependências de produção para o pacote 'frontend'
    # O Next.js precisa de algumas devDependencies (como 'typescript') no build,
    # mas para a imagem final, só as de produção.
    # Vamos instalar todas aqui e depois copiar seletivamente.
    # Ou, se o build do Next.js não precisar de devDependencies, use --prod.
    # Por segurança e para garantir que o build funcione, vamos instalar todas por enquanto
    # e otimizar depois se necessário.
    RUN pnpm install --filter frontend
    # Para uma imagem de produção menor, idealmente seria:
    # RUN pnpm install --prod --filter frontend
    # Mas o build do Next.js pode precisar de devDependencies.

    # ---- Build Stage ----
    # Compila a aplicação Next.js.
    FROM base AS build
    WORKDIR /usr/src/app

    # Copia dependências já instaladas
    COPY --from=dependencies /usr/src/app/node_modules ./node_modules
    COPY --from=dependencies /usr/src/app/package.json ./package.json

    # Copia o restante do código fonte do frontend
    # Inclui .next/standalone se gerado localmente, mas o build aqui vai gerar.
    COPY . .

    # Variáveis de ambiente de BUILD TIME (se necessárias para o build)
    # Ex: NEXT_PUBLIC_API_URL pode ser necessário se usado durante o build
    # ARG NEXT_PUBLIC_API_URL
    # ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

    # Executa o build do Next.js
    # Isso gera a pasta .next otimizada para produção
    RUN pnpm build

    # ---- Production Stage ----
    # Cria a imagem final, leve, apenas com o necessário para rodar.
    FROM base AS production
    WORKDIR /usr/src/app

    # Define o ambiente para produção (importante para Next.js)
    ENV NODE_ENV=production

    # Copia o package.json e as dependências de produção do estágio 'dependencies'
    # Isso é feito para que o 'pnpm start' funcione corretamente.
    COPY --from=dependencies /usr/src/app/package.json ./package.json
    COPY --from=dependencies /usr/src/app/node_modules ./node_modules

    # Copia a pasta .next buildada do estágio 'build'
    # Esta pasta contém a aplicação otimizada.
    COPY --from=build /usr/src/app/.next ./.next

    # Copia a pasta 'public' (contém imagens, fontes, etc.)
    COPY --from=build /usr/src/app/public ./public

    # Expõe a porta que o Next.js usa por padrão (3000)
    EXPOSE 3000

    # Comando para iniciar o servidor Next.js em modo de produção
    # O script 'start' no package.json do frontend deve ser 'next start'
    CMD [ "pnpm", "start" ]
    