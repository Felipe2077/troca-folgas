# apps/frontend/Dockerfile

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia arquivos de manifesto de workspace e o package.json da raiz
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./

# Copia os package.json e o código fonte de TODOS os pacotes e apps
COPY apps ./apps
COPY packages ./packages
# REMOVIDO: Cópia de configs da raiz (postcss, tailwind, tsconfig.base)
# O build do Next.js usará os configs dentro de apps/frontend/

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Instala TODAS as dependências do workspace (incluindo devDependencies para o build do Next.js)
RUN pnpm install --frozen-lockfile

# Builda o pacote shared-types primeiro, pois o frontend depende dele
RUN pnpm --filter @repo/shared-types run build

# Builda o frontend (executa 'next build')
RUN pnpm --filter frontend run build

# Stage 2: Produção
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV production

# Copia o package.json do frontend para a raiz do WORKDIR
COPY --from=builder /app/apps/frontend/package.json ./package.json

# Copia o pnpm-lock.yaml e pnpm-workspace.yaml para instalar dependências de produção
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
# Copia os package.json dos pacotes do workspace
COPY --from=builder /app/packages/shared-types/package.json ./packages/shared-types/package.json
# Copia o código buildado do shared-types
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist

# Instala SOMENTE as dependências de PRODUÇÃO para o frontend
RUN npm install -g pnpm
RUN pnpm install --prod

# Copia os artefatos de build do Next.js (.next e public)
COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/public ./public

EXPOSE 3000
CMD [ "pnpm", "start" ]
