#!/bin/bash

echo "🚀 Aplicando correções rápidas..."

# 1. Remove arquivo de teste problemático
rm -f apps/backend/src/test-prisma-import.ts

# 2. Usa CommonJS ao invés de ESM (mais simples para build)
echo "📝 Mudando para CommonJS..."

# Atualiza tsconfig.json
cat > apps/backend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowJs": true,
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Remove "type": "module" do package.json
cd apps/backend
npm pkg delete type
cd ../..

# 3. Corrige os erros de tipo em request.routes.ts
echo "🔧 Corrigindo erros de tipo..."

# Backup
cp apps/backend/src/routes/request.routes.ts apps/backend/src/routes/request.routes.ts.backup

# Correções
sed -i '
    # Corrige o parâmetro tx
    s/async (tx) =>/async (tx: any) =>/g
    
    # Corrige o erro de console.error
    s/console\.error(\(.*\), error);/console.error(\1, String(error));/g
' apps/backend/src/routes/request.routes.ts

# Corrige os problemas de indexação
perl -i -pe '
    s/dayOrderMap\[startDay\]/dayOrderMap[startDay as DayOfWeek]/g;
    s/dayOrderMap\[endDay\]/dayOrderMap[endDay as DayOfWeek]/g;
' apps/backend/src/routes/request.routes.ts

echo "✅ Todas as correções aplicadas!"
echo ""
echo "🏗️  Executando build Docker..."

docker build \
    --platform linux/amd64 \
    -t felipebatista54/sistema-trocas-backend:latest \
    --no-cache \
    -f apps/backend/Dockerfile \
    .