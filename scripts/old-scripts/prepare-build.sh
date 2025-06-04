#!/bin/bash

echo "🚀 Preparando projeto para build..."

# 1. Gera o Prisma Client
echo "📦 Gerando Prisma Client..."
cd apps/backend

# Garante que temos um .env
if [ ! -f .env ]; then
    echo "DATABASE_URL=\"postgresql://user:password@localhost:5432/db\"" > .env
fi

# Limpa e gera
rm -rf src/generated/prisma
npx prisma generate

cd ../..

# 2. Verifica se foi gerado
if [ ! -d "apps/backend/src/generated/prisma" ]; then
    echo "❌ Erro: Prisma Client não foi gerado"
    exit 1
fi

echo "✅ Prisma Client gerado"

# 3. Corrige os imports se necessário
echo "🔧 Verificando imports..."

# Arquivos que usam Prisma
FILES=(
    "apps/backend/src/lib/audit.ts"
    "apps/backend/src/lib/prisma.ts"
    "apps/backend/src/routes/auth.routes.ts"
    "apps/backend/src/routes/request.routes.ts"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        # Verifica se ainda tem o import errado
        if grep -q "from '../generated/prisma/index.js'" "$file" 2>/dev/null; then
            echo "📝 Corrigindo import em: $file"
            sed -i.bak "s|from '../generated/prisma/index.js'|from '../generated/prisma'|g" "$file"
            rm -f "${file}.bak"
        fi
        
        # Também corrige imports relativos se necessário
        if grep -q "from './generated/prisma/index.js'" "$file" 2>/dev/null; then
            sed -i.bak "s|from './generated/prisma/index.js'|from './generated/prisma'|g" "$file"
            rm -f "${file}.bak"
        fi
    fi
done

# 4. Copia o tsconfig.json se necessário
if [ -f "tsconfig.json" ]; then
    echo "📋 Copiando tsconfig.json para o backend..."
    cp tsconfig.json apps/backend/
fi

echo ""
echo "✅ Projeto preparado!"
echo ""
echo "🏗️  Agora execute o build Docker:"
echo "   docker build --platform linux/amd64 -t felipebatista54/sistema-trocas-backend:latest --no-cache -f apps/backend/Dockerfile ."