# Build otimizado - Assume que o Prisma Client já foi gerado localmente

# Stage 1: Dependencies
FROM node:20-bookworm-slim AS deps

# Instala apenas o OpenSSL necessário para runtime
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instala pnpm
RUN npm install -g pnpm@10.6.5

# Copia arquivos de configuração do monorepo
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copia os package.json dos workspaces
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared-types/package.json ./packages/shared-types/

# IMPORTANTE: Instala dependências SEM executar scripts
RUN pnpm install --frozen-lockfile --ignore-scripts

# Stage 2: Builder
FROM deps AS builder

WORKDIR /app

# Copia o código fonte
COPY apps/backend ./apps/backend
COPY packages/shared-types ./packages/shared-types

# IMPORTANTE: Remove o postinstall para evitar tentativa de gerar Prisma
RUN cd apps/backend && \
    npm pkg delete scripts.postinstall && \
    cd ../..

# Builda o shared-types primeiro
RUN pnpm --filter @repo/shared-types run build

# Builda o backend
RUN pnpm --filter backend run build

# Stage 3: Runner (Produção)
FROM node:20-bookworm-slim AS runner

# Instala apenas o necessário para runtime
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Cria usuário não-root para segurança
RUN addgroup --gid 1001 nodejs && \
    adduser --uid 1001 --ingroup nodejs nodejs

# Copia os arquivos buildados
COPY --from=builder --chown=nodejs:nodejs /app/apps/backend/dist ./dist

# IMPORTANTE: Copia o Prisma Client já gerado
COPY --from=builder --chown=nodejs:nodejs /app/apps/backend/src/generated ./src/generated

# Copia o schema (caso precise para runtime)
COPY --from=builder --chown=nodejs:nodejs /app/apps/backend/prisma ./prisma

# Copia as dependências de produção
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/apps/backend/node_modules ./apps/backend/node_modules

# Copia o shared-types buildado
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-types/dist ./packages/shared-types/dist

# Define usuário não-root
USER nodejs

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); })"

CMD ["node", "dist/server.js"]