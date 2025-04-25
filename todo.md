# Contexto geral.

Apresentado o sistema em seu estado atual ao usuário administrador, ele gostou bastante e juntos chegamos a alguns pontos de mudança.

## regras de validação agendamento:

- Crachá: min 5 a max 6 numeros
- Trocas apenas dentro do mesmo mês

## Dashboad:

- na coluna status: dropdown na própria coluna status com as opções de status (listadas abaixo):
  - Agendado (status inicial, chega desse jeito) [neutro].
  - Realizado (usuário marca quando agendou no erp) [verde].
  - Não Realizado (por algum motivo não foi realizado) [vermelho]

### coluna observação:

- Clique no campo e já abre o menu de edição de observação.

## Lógica para substituição:

A lógica mudou, o propósito do sistema é ser um controle centralizado do que deve ser lançado no erp da empresa.

Fluxo atual (sem o nosso sistema): o administrador recebe as trocas em planilhas diferentes feitas por vários encarregados -> abre cada planilha e copia e cola pra uma planilha dele de controle de lançamentos -> lança o que for troca e substituição daquela semana (ele filtra o sábado e domingo daquela semana e faz o lançamento, o admin sempre se orienta pela semana). Problemas dessa forma: Muitos encarregados mandam informações incorretas que nao tem como imperdir em uma planilha (mesmo grupo de folga por exemplo).

Nosso sistema: Será um controle centralizado para o administrador. com esse "funil" a informação virá para o mesmo lugar e chegará tratada ao máximo, a dashboard vai facilitar o controle de lançamentos no erp da empresa. O adm irá filtrar a troca e substituição do fim de semana daquela semana e fará o lançamento no erp e marcará como agendada (por isso a lógica mudou de status mudou).

Substituição conta como dois lançamentos: Quando tipo for substituição gera duas linhas, primeira linha será a "original" e a segunda inverte a ordem de datas e crachá para ser um espelho de controle. Com o filtro de data o usuário irá controlar a semana que precisa lançar no ERP (esse sistema de trocas é um controle para o usário fazer os lançamentos no ERP da empresa semana a semana, por isso os filtros).
Lógica resumida de substituição: recebe a substituição => gera duas linhas, na segunda linha: inverte o crachá e datas. Com os filtros fica possível o controle da semana.

Troca permanece a mesma coisa.

## Adicionar filtro em todas as colunas da tabela.

## Gerenciamento de users

Identificador único de login em toda aplicação será: crachá (min 5 e max 6 numeros).

é isso, entenda isso e me diga os pontos que eu falei se vc pegou tudo ou ficou alguma duvida, liste o que vc entendeu que precisará mudar, enfim me informe o que vc entendeu
