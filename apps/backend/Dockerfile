# apps/backend/Dockerfile (para cliente Prisma pré-gerado localmente)

# Stage 1: Builder - Prepara dependências e builda o código TS
# Usar node:20 (full) para ter um ambiente de build mais robusto
FROM node:20 AS builder
WORKDIR /app

# Copia arquivos de manifesto de workspace e o package.json da raiz
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./

# Copia os package.json e o código fonte de TODOS os pacotes e apps
# Isso inclui apps/backend/src/generated/prisma (gerado localmente)
# e também node_modules/@prisma/engines (que conterá o motor Linux baixado localmente)
COPY apps ./apps
COPY packages ./packages
# COPY tsconfig.json ./tsconfig.base.json # Se o tsconfig do backend estender um da raiz

RUN npm install -g pnpm
# Instala todas as dependências, incluindo devDependencies para o build
RUN pnpm install --frozen-lockfile

# Builda o pacote shared-types primeiro
RUN pnpm --filter @repo/shared-types run build

# Builda APENAS o pacote backend (executa 'tsc')
# NÃO rodamos 'prisma generate' aqui.
RUN pnpm --filter backend run build

# Stage 2: Produção - Cria a imagem final leve
# Usar node:20 (full) também para produção para garantir compatibilidade com o motor Prisma
FROM node:20 AS production
WORKDIR /app
ENV NODE_ENV production

# Copia o package.json do backend
COPY --from=builder /app/apps/backend/package.json ./package.json

# Copia arquivos de lock e workspace para instalar dependências de produção
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/shared-types/package.json ./packages/shared-types/package.json
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist

# Instala SOMENTE as dependências de PRODUÇÃO
RUN npm install -g pnpm
RUN pnpm install --prod

# Copia o código JavaScript buildado (pasta dist) do backend
COPY --from=builder /app/apps/backend/dist ./dist
# Copia a pasta prisma (contendo o schema)
COPY --from=builder /app/apps/backend/prisma ./prisma

# Copia o Prisma Client PRÉ-GERADO (do seu ambiente local, via estágio builder)
# para o local onde o backend espera encontrá-lo (src/generated/prisma)
COPY --from=builder /app/apps/backend/src/generated/prisma ./dist/generated/prisma

# Copia o MOTOR LINUX específico do Prisma que foi baixado/preparado
# pelo 'prisma generate' local (com o binaryTarget correto) e copiado para o builder.
# O Prisma Client (em src/generated/prisma) procurará por este motor.
# O caminho exato do motor no builder pode ser /app/node_modules/@prisma/engines/ ou
# /app/apps/backend/node_modules/.prisma/client/runtime/
# Vamos copiar de um local comum onde o 'prisma generate' com binaryTargets os coloca.
# Este é o motor para Debian com OpenSSL 1.1.x.
COPY --from=builder /app/apps/backend/node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node ./node_modules/.prisma/client/
# Ou, se estiver em @prisma/engines na raiz do node_modules do builder:
# COPY --from=builder /app/node_modules/@prisma/engines/libquery_engine-debian-openssl-3.0.x.so.node ./node_modules/@prisma/engines/

EXPOSE 3333
CMD [ "node", "dist/server.js" ]