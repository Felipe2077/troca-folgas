#!/bin/bash

echo "🔧 Padronizando todos os imports para CommonJS..."

# 1. Remove o index.ts que criamos (não precisamos dele)
rm -f apps/backend/src/index.ts

# 2. Corrige o server.ts removendo top-level awaits
echo "📝 Corrigindo server.ts..."
cat > apps/backend/src/server.ts << 'EOF'
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import env from '@fastify/env';
import { authRoutes } from './routes/auth.routes';
import { swapRequestRoutes } from './routes/request.routes';
import { settingsRoutes } from './routes/settings.routes';

const schema = {
  type: 'object',
  required: ['JWT_SECRET'],
  properties: {
    JWT_SECRET: {
      type: 'string',
    },
    PORT: {
      type: 'string',
      default: '3000'
    },
    NODE_ENV: {
      type: 'string',
      default: 'development'
    }
  }
};

const options = {
  confKey: 'config',
  schema: schema,
  dotenv: true
};

async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport: process.env.NODE_ENV === 'production' 
        ? undefined 
        : {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
    },
  });

  // Register plugins
  await app.register(env, options);
  await app.register(cors, {
    origin: true,
    credentials: true,
  });
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'default-secret-key',
  });

  // Decorate authenticate
  app.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // Health check
  app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Register routes
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(swapRequestRoutes, { prefix: '/api/requests' });
  await app.register(settingsRoutes, { prefix: '/api/settings' });

  return app;
}

// Start server
async function start() {
  const app = await buildApp();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const host = '0.0.0.0';

  try {
    await app.listen({ port, host });
    console.log(`Server running at http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Export for testing
export { buildApp };

// Start if running directly
if (require.main === module) {
  start();
}
EOF

# 3. Corrige os imports do Prisma (remove .js e adiciona index)
echo "📝 Corrigindo imports do Prisma..."
FILES=(
    "apps/backend/src/lib/audit.ts"
    "apps/backend/src/lib/prisma.ts"
    "apps/backend/src/routes/auth.routes.ts"
    "apps/backend/src/routes/request.routes.ts"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        # Corrige import do Prisma
        sed -i.bak "s|from '../generated/prisma.*'|from '../generated/prisma'|g" "$file"
        sed -i.bak "s|from './generated/prisma.*'|from './generated/prisma'|g" "$file"
        rm -f "${file}.bak"
        echo "  ✓ Corrigido: $file"
    fi
done

# 4. Remove extensões .js de todos os imports locais
echo "📝 Removendo extensões .js dos imports..."
find apps/backend/src -name "*.ts" -type f | while read file; do
    # Remove .js de imports locais
    sed -i.bak "s|from '\(\.\.*/[^']*\)\.js'|from '\1'|g" "$file"
    sed -i.bak "s|from '\(\./[^']*\)\.js'|from '\1'|g" "$file"
    rm -f "${file}.bak"
done

# 5. Verifica se app.ts existe, senão cria um básico
if [ ! -f "apps/backend/src/app.ts" ]; then
    echo "📝 Criando app.ts..."
    cat > apps/backend/src/app.ts << 'EOF'
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { authRoutes } from './routes/auth.routes';
import { swapRequestRoutes } from './routes/request.routes';
import { settingsRoutes } from './routes/settings.routes';

export const app = Fastify({
  logger: true
});

// Register plugins
app.register(cors, {
  origin: true,
  credentials: true,
});

app.register(jwt, {
  secret: process.env.JWT_SECRET || 'default-secret-key',
});

// Decorate authenticate
app.decorate('authenticate', async function (request: any, reply: any) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Health check
app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Register routes
app.register(authRoutes, { prefix: '/api/auth' });
app.register(swapRequestRoutes, { prefix: '/api/requests' });
app.register(settingsRoutes, { prefix: '/api/settings' });
EOF
fi

# 6. Corrige os erros de tipo em request.routes.ts
echo "📝 Corrigindo tipos em request.routes.ts..."
python3 << 'PYTHON'
import re

with open('apps/backend/src/routes/request.routes.ts', 'r') as f:
    content = f.read()

# Corrige async (tx) =>
content = re.sub(r'async \(tx\) =>', 'async (tx: any) =>', content)

# Corrige dayOrderMap indexing
content = re.sub(r'dayOrderMap\[startDay\]', 'dayOrderMap[startDay as keyof typeof dayOrderMap]', content)
content = re.sub(r'dayOrderMap\[endDay\]', 'dayOrderMap[endDay as keyof typeof dayOrderMap]', content)

# Corrige console.error
content = re.sub(
    r"console\.error\('Erro ao criar swap request:', error\);",
    "console.error('Erro ao criar swap request:', error instanceof Error ? error.message : String(error));",
    content
)

with open('apps/backend/src/routes/request.routes.ts', 'w') as f:
    f.write(content)

print("✓ Tipos corrigidos em request.routes.ts")
PYTHON

# 7. Garante que o tsconfig está correto
echo "📝 Verificando tsconfig.json..."
cp apps/backend/tsconfig.json apps/backend/tsconfig.json.bak 2>/dev/null || true

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

# 8. Atualiza o Dockerfile para usar server.js novamente
echo "📝 Atualizando Dockerfile..."
sed -i.bak 's/CMD \["node", "dist\/index.js"\]/CMD ["node", "dist\/server.js"]/' apps/backend/Dockerfile 2>/dev/null || true
rm -f apps/backend/Dockerfile.bak

echo ""
echo "✅ Todas as correções aplicadas!"
echo ""
echo "📋 Resumo das mudanças:"
echo "  - server.ts refatorado sem top-level await"
echo "  - Todos os imports padronizados para CommonJS (sem .js)"
echo "  - Tipos corrigidos em request.routes.ts"
echo "  - tsconfig.json configurado para CommonJS"
echo ""
echo "🏗️  Agora execute o build:"
echo "   docker build --platform linux/amd64 -t felipebatista54/sistema-trocas-backend:latest --no-cache -f apps/backend/Dockerfile ."