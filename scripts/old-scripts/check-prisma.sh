#!/bin/bash

echo "🔍 Verificando Prisma Client..."

# Verifica se o diretório existe
if [ -d "apps/backend/src/generated/prisma" ]; then
    echo "✅ Diretório do Prisma Client existe"
    echo ""
    echo "📁 Conteúdo:"
    ls -la apps/backend/src/generated/prisma/
    echo ""
    
    # Verifica se o arquivo index.js existe
    if [ -f "apps/backend/src/generated/prisma/index.js" ]; then
        echo "✅ index.js encontrado"
    else
        echo "❌ index.js NÃO encontrado"
        echo ""
        echo "Arquivos .d.ts encontrados:"
        find apps/backend/src/generated/prisma -name "*.d.ts" -type f
    fi
else
    echo "❌ Diretório do Prisma Client NÃO existe"
    echo "Execute ./generate-prisma.sh primeiro"
fi