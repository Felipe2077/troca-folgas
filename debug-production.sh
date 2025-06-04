#!/bin/bash

echo "🔍 Debugando erro de produção..."

# 1. Verifica o que está no dist/server.js
echo "📋 Primeiras linhas do server.js compilado:"
head -20 apps/backend/dist/server.js 2>/dev/null || echo "Arquivo não encontrado localmente"

# 2. Roda o container em modo debug
echo ""
echo "🐳 Rodando container em modo debug..."
echo ""

docker run --rm -it \
  --entrypoint /bin/bash \
  felipebatista54/sistema-trocas-backend:latest \
  -c "
    echo '=== Estrutura de arquivos no container ==='
    ls -la /app/
    echo ''
    echo '=== Conteúdo de /app/dist ==='
    ls -la /app/dist/
    echo ''
    echo '=== Primeiras 20 linhas de server.js ==='
    head -20 /app/dist/server.js
    echo ''
    echo '=== Verificando node_modules ==='
    ls -la /app/node_modules | head -10
    echo ''
    echo '=== Tentando rodar com mais detalhes ==='
    cd /app && node --trace-warnings dist/server.js
  "