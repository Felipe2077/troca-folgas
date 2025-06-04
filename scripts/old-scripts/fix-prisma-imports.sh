#!/bin/bash

echo "🔧 Corrigindo imports do Prisma..."

# Lista de arquivos que precisam ser corrigidos
FILES=(
    "apps/backend/src/lib/audit.ts"
    "apps/backend/src/lib/prisma.ts"
    "apps/backend/src/routes/auth.routes.ts"
    "apps/backend/src/routes/request.routes.ts"
)

# Corrige os imports
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "📝 Atualizando: $file"
        # Muda de '../generated/prisma/index.js' para '../generated/prisma'
        sed -i.bak "s|'../generated/prisma/index.js'|'../generated/prisma'|g" "$file"
        sed -i.bak 's|"../generated/prisma/index.js"|"../generated/prisma"|g' "$file"
        
        # Remove arquivos de backup
        rm -f "${file}.bak"
    fi
done

echo "✅ Imports corrigidos!"