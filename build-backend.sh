#!/bin/bash

# build-backend.sh - Script principal para build do backend

set -e  # Para se houver erro

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para mostrar uso
show_usage() {
    echo "Uso: $0 [opções]"
    echo ""
    echo "Opções:"
    echo "  generate-prisma  - Apenas gera o Prisma Client"
    echo "  build           - Faz o build Docker (padrão)"
    echo "  all             - Gera Prisma e faz build"
    echo "  push            - Faz push da imagem para o registry"
    echo "  help            - Mostra esta mensagem"
    echo ""
    echo "Exemplos:"
    echo "  $0                    # Faz apenas o build"
    echo "  $0 generate-prisma    # Gera apenas o Prisma Client"
    echo "  $0 all                # Gera Prisma e faz build"
    echo "  $0 push               # Faz push após o build"
}

# Função para gerar Prisma
generate_prisma() {
    echo -e "${YELLOW}📦 Gerando Prisma Client...${NC}"
    
    cd apps/backend
    
    # Verifica se existe .env, senão cria temporário
    if [ ! -f .env ]; then
        echo "DATABASE_URL=\"postgresql://user:password@localhost:5432/db\"" > .env.temp
        TEMP_ENV=true
    fi
    
    # Gera o Prisma
    npx prisma generate
    
    # Remove .env temporário se foi criado
    if [ "$TEMP_ENV" = true ]; then
        rm -f .env.temp
    fi
    
    cd ../..
    
    # Verifica se foi gerado
    if [ -d "apps/backend/src/generated/prisma" ]; then
        echo -e "${GREEN}✅ Prisma Client gerado com sucesso!${NC}"
        return 0
    else
        echo -e "${RED}❌ Erro ao gerar Prisma Client${NC}"
        return 1
    fi
}

# Função para fazer build Docker
build_docker() {
    echo -e "${YELLOW}🐳 Fazendo build Docker...${NC}"
    
    # Verifica se o Prisma Client existe
    if [ ! -d "apps/backend/src/generated/prisma" ]; then
        echo -e "${YELLOW}⚠️  Prisma Client não encontrado. Gerando...${NC}"
        generate_prisma
    fi
    
    # Tag da imagem
    IMAGE_NAME="felipebatista54/sistema-trocas-backend"
    IMAGE_TAG="${IMAGE_TAG:-latest}"
    FULL_IMAGE="$IMAGE_NAME:$IMAGE_TAG"
    
    echo -e "${BLUE}🏗️  Building: $FULL_IMAGE${NC}"
    
    # Faz o build
    docker build \
        --platform linux/amd64 \
        -t "$FULL_IMAGE" \
        --no-cache \
        -f apps/backend/Dockerfile \
        .
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
        echo -e "${GREEN}   Imagem: $FULL_IMAGE${NC}"
        return 0
    else
        echo -e "${RED}❌ Erro no build Docker${NC}"
        return 1
    fi
}

# Função para fazer push
push_image() {
    IMAGE_NAME="felipebatista54/sistema-trocas-backend"
    IMAGE_TAG="${IMAGE_TAG:-latest}"
    FULL_IMAGE="$IMAGE_NAME:$IMAGE_TAG"
    
    echo -e "${YELLOW}📤 Fazendo push da imagem...${NC}"
    echo -e "${BLUE}   Imagem: $FULL_IMAGE${NC}"
    
    docker push "$FULL_IMAGE"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Push concluído!${NC}"
    else
        echo -e "${RED}❌ Erro no push${NC}"
        return 1
    fi
}

# Main
case "${1:-build}" in
    "generate-prisma")
        generate_prisma
        ;;
    "build")
        build_docker
        ;;
    "all")
        generate_prisma && build_docker
        ;;
    "push")
        build_docker && push_image
        ;;
    "help"|"-h"|"--help")
        show_usage
        ;;
    *)
        echo -e "${RED}Opção inválida: $1${NC}"
        show_usage
        exit 1
        ;;
esac