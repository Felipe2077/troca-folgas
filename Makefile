# Makefile para facilitar comandos do backend

.PHONY: help prisma build push run clean dev

# Variáveis
IMAGE_NAME = felipebatista54/sistema-trocas-backend
IMAGE_TAG ?= latest

# Help por padrão
help:
	@echo "Comandos disponíveis:"
	@echo "  make prisma    - Gera o Prisma Client"
	@echo "  make build     - Faz build da imagem Docker"
	@echo "  make push      - Faz push da imagem para o registry"
	@echo "  make run       - Roda o container localmente"
	@echo "  make dev       - Roda em modo desenvolvimento"
	@echo "  make clean     - Limpa arquivos gerados"

# Gera Prisma Client
prisma:
	@echo "📦 Gerando Prisma Client..."
	@cd apps/backend && npx prisma generate

# Build Docker
build: prisma
	@echo "🐳 Building Docker image..."
	@docker build --platform linux/amd64 \
		-t $(IMAGE_NAME):$(IMAGE_TAG) \
		--no-cache \
		-f apps/backend/Dockerfile .

# Push para registry
push: build
	@echo "📤 Pushing to registry..."
	@docker push $(IMAGE_NAME):$(IMAGE_TAG)

# Roda localmente
run:
	@echo "🚀 Running container..."
	@docker run -d \
		--name sistema-trocas-backend \
		-p 3000:3000 \
		--env-file apps/backend/.env \
		$(IMAGE_NAME):$(IMAGE_TAG)

# Desenvolvimento local
dev:
	@echo "🔧 Starting development server..."
	@pnpm --filter backend run dev

# Limpa arquivos gerados
clean:
	@echo "🧹 Cleaning generated files..."
	@rm -rf apps/backend/dist
	@rm -rf apps/backend/src/generated
	@docker rmi $(IMAGE_NAME):$(IMAGE_TAG) 2>/dev/null || true