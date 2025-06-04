#!/bin/bash

echo "🔧 Corrigindo erros finais do TypeScript..."

# 1. Verifica o nome correto do export em request.routes.ts
echo "📝 Verificando exports em request.routes.ts..."
EXPORT_NAME=$(grep -o "export.*function.*Routes" apps/backend/src/routes/request.routes.ts | grep -o "[a-zA-Z]*Routes" | head -1)
echo "   Export encontrado: $EXPORT_NAME"

# 2. Corrige os imports em app.ts e server.ts
echo "📝 Corrigindo imports do requestRoutes..."
if [ "$EXPORT_NAME" = "requestRoutes" ]; then
    # Corrige app.ts
    sed -i.bak "s/import { swapRequestRoutes }/import { requestRoutes }/" apps/backend/src/app.ts
    sed -i.bak "s/app.register(swapRequestRoutes/app.register(requestRoutes/" apps/backend/src/app.ts
    
    # Corrige server.ts
    sed -i.bak "s/import { swapRequestRoutes }/import { requestRoutes }/" apps/backend/src/server.ts
    sed -i.bak "s/await app.register(swapRequestRoutes/await app.register(requestRoutes/" apps/backend/src/server.ts
else
    # Se for swapRequestRoutes, garante que está correto
    sed -i.bak "s/import { requestRoutes }/import { swapRequestRoutes }/" apps/backend/src/app.ts
    sed -i.bak "s/app.register(requestRoutes/app.register(swapRequestRoutes/" apps/backend/src/app.ts
    
    sed -i.bak "s/import { requestRoutes }/import { swapRequestRoutes }/" apps/backend/src/server.ts
    sed -i.bak "s/await app.register(requestRoutes/await app.register(swapRequestRoutes/" apps/backend/src/server.ts
fi

# Remove backups
rm -f apps/backend/src/*.bak

# 3. Corrige os erros de tipo em request.routes.ts (novamente, pois parece não ter aplicado)
echo "📝 Aplicando correções de tipo..."
cat > /tmp/fix_types.py << 'PYTHON'
import re

with open('apps/backend/src/routes/request.routes.ts', 'r') as f:
    content = f.read()

# Linha 249: Corrige async (tx) =>
if 'async (tx)' in content and 'async (tx: any)' not in content:
    content = re.sub(r'async \(tx\)\s*=>', 'async (tx: any) =>', content)
    print("  ✓ Corrigido: async (tx: any)")

# Linhas 215-216: Corrige dayOrderMap
if 'dayOrderMap[startDay]' in content and 'as keyof typeof dayOrderMap' not in content:
    content = re.sub(r'dayOrderMap\[startDay\]', 'dayOrderMap[startDay as keyof typeof dayOrderMap]', content)
    content = re.sub(r'dayOrderMap\[endDay\]', 'dayOrderMap[endDay as keyof typeof dayOrderMap]', content)
    print("  ✓ Corrigido: dayOrderMap indexing")

# Linha 324: Corrige console.error
if "'Erro ao criar swap request:', error);" in content and 'instanceof Error' not in content:
    content = re.sub(
        r"console\.error\('Erro ao criar swap request:', error\);",
        "console.error('Erro ao criar swap request:', error instanceof Error ? error.message : String(error));",
        content
    )
    print("  ✓ Corrigido: console.error")

with open('apps/backend/src/routes/request.routes.ts', 'w') as f:
    f.write(content)
PYTHON

python3 /tmp/fix_types.py
rm -f /tmp/fix_types.py

# 4. IMPORTANTE: Copia o Prisma Client para dentro do contexto Docker
echo "📦 Preparando Prisma Client para Docker..."
if [ ! -d "apps/backend/src/generated/prisma" ]; then
    echo "  ⚠️  Prisma Client não encontrado! Gerando..."
    cd apps/backend
    npx prisma generate
    cd ../..
fi

# 5. Atualiza o .dockerignore para NÃO ignorar o Prisma gerado
echo "📝 Atualizando .dockerignore..."
if grep -q "src/generated" .dockerignore 2>/dev/null; then
    # Comenta a linha que ignora o Prisma gerado
    sed -i.bak 's|^.*src/generated.*|# &|' .dockerignore
    rm -f .dockerignore.bak
fi

# 6. Verifica se existe settings.routes.ts, senão cria um básico
if [ ! -f "apps/backend/src/routes/settings.routes.ts" ]; then
    echo "📝 Criando settings.routes.ts básico..."
    cat > apps/backend/src/routes/settings.routes.ts << 'EOF'
import { FastifyPluginAsync } from 'fastify';

export const settingsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {
    return { message: 'Settings routes' };
  });
};
EOF
fi

echo ""
echo "✅ Todas as correções aplicadas!"
echo ""
echo "📋 Verificações:"
ls -la apps/backend/src/generated/prisma/ 2>/dev/null | head -5 || echo "  ⚠️  Prisma Client não encontrado"
echo ""
echo "🏗️  Execute o build:"
echo "   docker build --platform linux/amd64 -t felipebatista54/sistema-trocas-backend:latest --no-cache -f apps/backend/Dockerfile ."