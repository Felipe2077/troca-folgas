#!/bin/bash

echo "🔧 Gerando Prisma Client..."

# Navega para o diretório do backend
cd apps/backend

# Cria um .env temporário se não existir
if [ ! -f .env ]; then
    echo "DATABASE_URL=\"postgresql://user:password@localhost:5432/db\"" > .env
    CREATED_ENV=true
fi

# Limpa geração anterior
rm -rf src/generated/prisma

# Gera o Prisma Client
echo "📦 Executando prisma generate..."
npx prisma generate

# Remove .env temporário se foi criado
if [ "$CREATED_ENV" = true ]; then
    rm -f .env
fi

# Verifica se foi gerado com sucesso
if [ -d "src/generated/prisma" ]; then
    echo "✅ Prisma Client gerado com sucesso em: apps/backend/src/generated/prisma"
    echo ""
    echo "📁 Arquivos gerados:"
    ls -la src/generated/prisma/
else
    echo "❌ Erro: Prisma Client não foi gerado"
    exit 1
fi

cd ../..

echo ""
echo "🚀 Agora você pode fazer o build Docker com:"
echo "   docker build --platform linux/amd64 -t felipebatista54/sistema-trocas-backend:latest -f apps/backend/Dockerfile ."