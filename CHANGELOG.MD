# Changelog

## [1.0.0] - 2025-05-21

### Adicionado

- Lançamento inicial do Sistema de Troca de Folgas.
- Funcionalidade de login para Admin e Encarregado via Crachá.
- Formulário de submissão de Trocas/Substituições para Encarregados com validações.
- Lógica de backend para criar registros "espelho" para Substituições.
- Dashboard do Administrador com:
  - Listagem de solicitações.
  - Cards de resumo.
  - Filtros por Status, Período de Datas (Criação), Crachás, Função, Grupos, Tipo.
  - Ordenação por múltiplas colunas.
  - Edição interativa de Status e Observação.
- Gerenciamento de Usuários pelo Admin (Listar, Criar, Ativar/Desativar, Editar Nome/Role).
- Configuração da Janela de Submissão pelo Admin.
- Registro de Auditoria no backend para ações chave.
- Proteção de Rotas e Notificações Toast no frontend.
- Dockerização completa da aplicação (Frontend, Backend, Banco de Dados).
