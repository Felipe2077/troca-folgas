# Sistema de Troca de Folgas (Nome Provisório)

Breve descrição do objetivo do sistema: Gerenciar trocas de folga entre motoristas/cobradores de transporte público.

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

- **Node.js:** Versão LTS recomendada (v18 ou v20+). ([Download](https://nodejs.org/))
- **pnpm:** Gerenciador de pacotes. ([Instalação](https://pnpm.io/installation))
- **Docker & Docker Compose:** Para gerenciar o container do banco de dados. ([Download Docker Desktop](https://www.docker.com/products/docker-desktop/) ou siga guias para Linux)
- **Git:** Para controle de versão. ([Download](https://git-scm.com/))

## Configuração do Ambiente de Desenvolvimento

1.  **Clone o Repositório:**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd sistema-trocas
    ```

2.  **Instale as Dependências:**
    Use o `pnpm` para instalar todas as dependências do monorepo.

    ```bash
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo `.env` na raiz do projeto.

    ```bash
    cp .env.example .env
    ```

    **Importante:** Abra o arquivo `.env` e gere um novo segredo para a variável `JWT_SECRET`. As outras variáveis podem geralmente manter os valores padrão para desenvolvimento local. **Não comite o arquivo `.env`!**

4.  **Inicie o Banco de Dados:**
    Use Docker Compose para iniciar o container do PostgreSQL em background.

    ```bash
    docker compose up -d
    ```

    _(Pode ser necessário `sudo` no Linux)_

5.  **Execute as Migrações do Banco:**
    Aplique as migrações do Prisma para criar/atualizar as tabelas no banco de dados Docker.
    ```bash
    pnpm --filter backend run db:migrate:dev
    ```
    _(Você pode ser solicitado a dar um nome para a migração na primeira vez)._

## Rodando a Aplicação em Modo de Desenvolvimento

Para rodar os servidores de frontend e backend com hot-reload:

- **Rodar Backend (API):**

  ```bash
  pnpm dev:api
  ```

  (A API estará disponível em `http://localhost:3333` por padrão)

- **Rodar Frontend (Web App):**
  (Abra outro terminal na raiz do projeto)

  ```bash
  pnpm dev:front
  ```

  (O frontend estará disponível em `http://localhost:3000` por padrão)

- **Rodar Ambos (Via Turborepo):**
  ```bash
  pnpm dev
  ```
  (Os logs de ambos serão intercalados no mesmo terminal)

## Scripts Úteis

- **Lint:** Verifica a qualidade do código em todos os pacotes.

  ```bash
  pnpm lint
  ```

- **Build:** Compila os pacotes para produção.

  ```bash
  pnpm build
  ```

- **Clean:** Remove `node_modules` e artefatos de build (útil para reinstalação limpa).

  ```bash
  pnpm clean
  ```

  (Depois rode `pnpm install` novamente)

- **Parar Banco de Dados:**
  ```bash
  docker compose down
  ```

## Estrutura do Projeto (Monorepo)

- `apps/backend`: Aplicação backend (API) com Fastify e Prisma.
- `apps/frontend`: Aplicação frontend com Next.js e React.
- `packages/`: Diretório para pacotes compartilhados (config, ui, etc. - _a ser criado se necessário_).

---
