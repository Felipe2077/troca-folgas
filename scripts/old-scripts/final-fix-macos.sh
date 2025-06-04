#!/bin/bash

echo "🚀 Aplicando todas as correções (macOS)..."

# 1. Gera Prisma Client se necessário
if [ ! -d "apps/backend/src/generated/prisma" ]; then
    echo "📦 Gerando Prisma Client..."
    cd apps/backend && npx prisma generate && cd ../..
fi

# 2. Cria arquivo Python para fazer as correções (mais confiável que sed no macOS)
cat > /tmp/fix_typescript.py << 'PYTHON'
import re
import sys

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Corrige async (tx) => para async (tx: any) =>
    content = re.sub(r'async \(tx\) =>', 'async (tx: any) =>', content)
    
    # Corrige dayOrderMap[startDay] e dayOrderMap[endDay]
    content = re.sub(r'dayOrderMap\[startDay\]', 'dayOrderMap[startDay as keyof typeof dayOrderMap]', content)
    content = re.sub(r'dayOrderMap\[endDay\]', 'dayOrderMap[endDay as keyof typeof dayOrderMap]', content)
    
    # Corrige console.error
    content = re.sub(
        r"console\.error\('Erro ao criar swap request:', error\);",
        "console.error('Erro ao criar swap request:', error instanceof Error ? error.message : String(error));",
        content
    )
    
    with open(filepath, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    fix_file(sys.argv[1])
PYTHON

# 3. Aplica correções usando Python
echo "🔧 Corrigindo request.routes.ts..."
python3 /tmp/fix_typescript.py apps/backend/src/routes/request.routes.ts

# 4. Cria index.ts sem top-level await
echo "📝 Criando index.ts..."
cat > apps/backend/src/index.ts << 'EOF'
import { app } from './app.js';

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const host = '0.0.0.0';

async function start() {
  try {
    await app.listen({ port, host });
    console.log(`Server running at http://${host}:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
EOF

# 5. Atualiza o Dockerfile para usar index.js
echo "📝 Atualizando Dockerfile..."
if [ -f "apps/backend/Dockerfile" ]; then
    # Cria uma cópia temporária com a mudança
    sed 's/CMD \["node", "dist\/server.js"\]/CMD ["node", "dist\/index.js"]/' apps/backend/Dockerfile > apps/backend/Dockerfile.tmp
    mv apps/backend/Dockerfile.tmp apps/backend/Dockerfile
fi

# 6. Limpa
rm -f /tmp/fix_typescript.py

echo "✅ Todas as correções aplicadas!"
echo ""
echo "🏗️  Execute o build com:"
echo "   docker build --platform linux/amd64 -t felipebatista54/sistema-trocas-backend:latest --no-cache -f apps/backend/Dockerfile ."