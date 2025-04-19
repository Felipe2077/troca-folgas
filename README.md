# Sistema de Troca de Folgas (Nome Provisório)

Breve descrição do objetivo do sistema: Gerenciar trocas e substituições de folga entre motoristas e cobradores de uma empresa de transporte público, com validações e aprovação administrativa.

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

- **Node.js:** Versão LTS recomendada (v20+). ([Download](https://nodejs.org/)) - Verifique com `node --version`.
- **pnpm:** Gerenciador de pacotes. ([Instalação](https://pnpm.io/installation)) - Verifique com `pnpm --version`. (Se precisar: `npm install -g pnpm`).
- **Docker & Docker Compose:** Para gerenciar o container do banco de dados PostgreSQL. Verifique se o serviço Docker está ativo. ([Download Docker Desktop](https://www.docker.com/products/docker-desktop/) ou siga guias para sua distro Linux).
- **Git:** Para controle de versão. ([Download](https://git-scm.com/)).

## Configuração do Ambiente de Desenvolvimento

Siga estes passos na **raiz** do projeto após clonar:

1.  **Clone o Repositório (se ainda não fez):**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd sistema-trocas
    ```

2.  **Instale as Dependências:**
    Use o `pnpm` para instalar todas as dependências do monorepo (frontend, backend, pacotes compartilhados, raiz).

    ```bash
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**

    - Copie o arquivo de exemplo para o local correto (`apps/backend/`).
      ```bash
      cp .env.example apps/backend/.env
      ```
    - **Abra o arquivo `apps/backend/.env`** e edite se necessário.
    - **MUITO IMPORTANTE:** Gere um novo segredo **único e forte** para a variável `JWT_SECRET`. Use o comando abaixo no terminal e cole o resultado:
      ```bash
      node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
      ```
    - Verifique se a `DATABASE_URL` está correta para o Docker (`...=@localhost:5432/...`).
    - As outras variáveis (`POSTGRES_*`, `BACKEND_PORT`, `NODE_ENV`) geralmente podem manter os valores padrão para desenvolvimento local.
    - **Lembre-se:** O arquivo `.env` não deve ser commitado no Git. Atualize o `.env.example` com as _chaves_ das variáveis (sem valores sensíveis como o `JWT_SECRET`).

4.  **Construa Pacotes Compartilhados:** (Necessário após `pnpm install` ou após alterações em `packages/*`)
    Compile os pacotes na pasta `packages/` (como nosso `@repo/shared-types`) para gerar os arquivos JavaScript (`dist/`) que serão importados pelas aplicações.

    ```bash
    pnpm turbo run build --filter=@repo/shared-types
    # Ou para buildar todos os pacotes e apps que têm script 'build':
    # pnpm build
    ```

5.  **Inicie o Banco de Dados Docker:**
    Use Docker Compose para iniciar o container PostgreSQL em background.

    ```bash
    docker compose up -d
    ```

    _(Pode ser necessário `sudo` no Linux. Aguarde alguns segundos para o banco iniciar completamente)._

6.  **Execute as Migrações do Banco:**
    Aplique as migrações do Prisma para criar a estrutura das tabelas no banco de dados Docker. **Use este comando específico** que carrega o `.env` do backend:

    ```bash
    pnpm --filter backend exec -- dotenv -e .env -- prisma migrate dev
    ```

    - Na primeira vez, ele perguntará um nome para a migração inicial. Sugestão: `initial_setup`.
    - Confirme a aplicação da migração.

7.  **Execute o Seed do Banco (Popular Dados Iniciais):**
    Popule o banco com dados iniciais (usuário Admin, Encarregado, configurações padrão). **Use este comando específico** que carrega o `.env`:
    ```bash
    pnpm --filter backend exec -- dotenv -e .env -- prisma db seed
    ```
    - Verifique no terminal se o seed foi executado com sucesso.

## Rodando a Aplicação em Modo de Desenvolvimento

Com o banco rodando e populado, inicie os servidores de frontend e backend (recomendado em terminais separados):

- **Terminal 1 - Rodar Backend (API):**
  (Navegue até a raiz do projeto `sistema-trocas/`)

  ```bash
  pnpm dev:api
  ```

  (A API estará disponível em `http://localhost:3333` por padrão)

- **Terminal 2 - Rodar Frontend (Web App):**
  (Abra outro terminal na raiz do projeto `sistema-trocas/`)

  ```bash
  pnpm dev:front
  ```

  (O frontend estará disponível em `http://localhost:3000` por padrão)

- **(Alternativa) Rodar Ambos (Via Turborepo):**
  (Navegue até a raiz do projeto `sistema-trocas/`)
  ```bash
  pnpm dev
  ```
  (Os logs de ambos serão intercalados no mesmo terminal)

## Scripts Úteis (Executar da Raiz)

- **Verificar Tipos (TypeScript):**

  ```bash
  pnpm typecheck
  # (Adicionar este script no package.json raiz: "typecheck": "turbo run typecheck")
  ```

  _(Verifica erros de tipo em todo o projeto sem compilar)_

- **Lint:** Verifica a qualidade do código em todos os pacotes.

  ```bash
  pnpm lint
  ```

- **Build (Produção):** Compila todos os pacotes e aplicações para produção.

  ```bash
  pnpm build
  ```

- **Abrir Prisma Studio:** Interface visual para o banco de dados.

  ```bash
  pnpm --filter backend run db:studio
  ```

- **Rodar Seed Manualmente:** (Após já ter rodado `migrate dev` antes)

  ```bash
  pnpm --filter backend exec -- dotenv -e .env -- prisma db seed
  ```

- **Criar Nova Migração:** (Após alterar `schema.prisma`)

  ```bash
  pnpm --filter backend exec -- dotenv -e .env -- prisma migrate dev --name nome_descritivo_da_migracao
  ```

- **Limpeza:** Remove `node_modules` e artefatos de build (útil para reinstalação limpa).

  ```bash
  pnpm clean
  ```

  (Depois rode `pnpm install` e os builds necessários novamente)

- **Parar Banco de Dados Docker:**
  ```bash
  docker compose down
  ```

## Estrutura do Projeto (Monorepo)

- `apps/backend`: Aplicação backend (API) com Fastify e Prisma.
- `apps/frontend`: Aplicação frontend com Next.js e React.
- `packages/shared-types`: Pacote com tipos e schemas Zod compartilhados.
- `packages/ui`: (Ainda não criado) Poderia conter componentes React compartilhados.
- `packages/eslint-config-custom`: (Ainda não criado) Poderia conter config ESLint compartilhada.
- `packages/tsconfig`: (Ainda não criado) Poderia conter configs TS base compartilhadas.

---
