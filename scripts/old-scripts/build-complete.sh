#!/bin/bash

echo "🚀 Iniciando processo completo de build..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Gerar Prisma Client
echo -e "${YELLOW}Passo 1: Gerando Prisma Client...${NC}"
./generate-prisma.sh

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao gerar Prisma Client${NC}"
    exit 1
fi

# 2. Verificar se o Prisma Client foi gerado
if [ ! -d "apps/backend/src/generated/prisma" ]; then
    echo -e "${RED}❌ Prisma Client não encontrado em apps/backend/src/generated/prisma${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prisma Client gerado com sucesso${NC}"

# 3. Build Docker
echo -e "${YELLOW}Passo 2: Fazendo build da imagem Docker...${NC}"

docker build \
    --platform linux/amd64 \
    -t felipebatista54/sistema-trocas-backend:latest \
    --no-cache \
    -f apps/backend/Dockerfile \
    .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
    echo ""
    echo "🏷️  Imagem criada: felipebatista54/sistema-trocas-backend:latest"
    echo ""
    echo "📤 Para fazer push:"
    echo "   docker push felipebatista54/sistema-trocas-backend:latest"
    echo ""
    echo "🏃 Para testar localmente:"
    echo "   docker run -p 3000:3000 --env-file .env felipebatista54/sistema-trocas-backend:latest"
else
    echo -e "${RED}❌ Erro no build Docker${NC}"
    exit 1
fi