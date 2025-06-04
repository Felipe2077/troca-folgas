#!/bin/bash

echo "🧹 Organizando scripts..."

# 1. Cria diretório para scripts
mkdir -p scripts

# 2. Move todos os scripts temporários para uma pasta de backup
mkdir -p scripts/old-scripts
mv build-complete.sh check-prisma.sh final-fix-macos.sh fix-all-imports.sh fix-prisma-imports.sh generate-prisma.sh prepare-build.sh quick-fix-all.sh scripts/old-scripts/ 2>/dev/null

# 3. Mantém apenas o script que funcionou
mv final-typescript-fixes.sh scripts/fix-typescript.sh 2>/dev/null

echo "✅ Scripts organizados em scripts/"
echo ""
echo "📁 Estrutura:"
echo "   scripts/"
echo "   ├── fix-typescript.sh (script que corrige erros do TypeScript)"
echo "   └── old-scripts/ (scripts antigos para backup)"