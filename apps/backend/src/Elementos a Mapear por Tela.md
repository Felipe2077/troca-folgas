Elementos a Mapear por Tela

1. Tela de Abertura/Splash
   
   1.1. Esperar 3 segundos para acabar a tela de splash.
   1.2. Clica no botão que leva a tela de login.
      xpath //android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup
   1.3.  Botão que leva a tela de login:
      

   1.4. depois que clicar vai para tela de login

2. Tela de Login
   2.1. na tela de login tem apenas um input e um botão, solicita numero de telefone, se o telefone existe ele direciona para login, senao, cadastro.
   2.2. input: 
   [{"key":"elementId","value":"00000000-0000-017d-ffff-ffff000005ab","name":"elementId"},{"key":"index","value":"0","name":"index"},{"key":"package","value":"br.com.xapps.paddockfan.android","name":"package"},{"key":"class","value":"android.widget.EditText","name":"class"},{"key":"text","value":"","name":"text"},{"key":"resource-id","value":"@undefined/input","name":"resource-id"},{"key":"checkable","value":"false","name":"checkable"},{"key":"checked","value":"false","name":"checked"},{"key":"clickable","value":"true","name":"clickable"},{"key":"enabled","value":"true","name":"enabled"},{"key":"focusable","value":"true","name":"focusable"},{"key":"focused","value":"false","name":"focused"},{"key":"long-clickable","value":"true","name":"long-clickable"},{"key":"password","value":"false","name":"password"},{"key":"scrollable","value":"false","name":"scrollable"},{"key":"selected","value":"false","name":"selected"},{"key":"bounds","value":"[108,1802][972,1875]","name":"bounds"},{"key":"displayed","value":"true","name":"displayed"},{"key":"hint","value":"","name":"hint"},{"key":"a11y-important","value":"true","name":"a11y-important"},{"key":"screen-reader-focusable","value":"false","name":"screen-reader-focusable"},{"key":"input-type","value":"28674","name":"input-type"},{"key":"drawing-order","value":"1","name":"drawing-order"},{"key":"showing-hint","value":"false","name":"showing-hint"},{"key":"text-entry-key","value":"false","name":"text-entry-key"},{"key":"multiline","value":"false","name":"multiline"},{"key":"dismissable","value":"false","name":"dismissable"},{"key":"a11y-focused","value":"false","name":"a11y-focused"},{"key":"heading","value":"false","name":"heading"},{"key":"live-region","value":"0","name":"live-region"},{"key":"context-clickable","value":"false","name":"context-clickable"},{"key":"max-text-length","value":"5000","name":"max-text-length"},{"key":"content-invalid","value":"false","name":"content-invalid"}]
   2.3. Botão:
   [{"key":"elementId","value":"00000000-0000-017d-ffff-ffff000005ac","name":"elementId"},{"key":"index","value":"2","name":"index"},{"key":"package","value":"br.com.xapps.paddockfan.android","name":"package"},{"key":"class","value":"android.view.ViewGroup","name":"class"},{"key":"text","value":"","name":"text"},{"key":"content-desc","value":"Continuar","name":"content-desc"},{"key":"checkable","value":"false","name":"checkable"},{"key":"checked","value":"false","name":"checked"},{"key":"clickable","value":"true","name":"clickable"},{"key":"enabled","value":"true","name":"enabled"},{"key":"focusable","value":"true","name":"focusable"},{"key":"focused","value":"false","name":"focused"},{"key":"long-clickable","value":"false","name":"long-clickable"},{"key":"password","value":"false","name":"password"},{"key":"scrollable","value":"false","name":"scrollable"},{"key":"selected","value":"false","name":"selected"},{"key":"bounds","value":"[63,1943][1017,2076]","name":"bounds"},{"key":"displayed","value":"true","name":"displayed"},{"key":"a11y-important","value":"true","name":"a11y-important"},{"key":"screen-reader-focusable","value":"false","name":"screen-reader-focusable"},{"key":"drawing-order","value":"3","name":"drawing-order"},{"key":"showing-hint","value":"false","name":"showing-hint"},{"key":"text-entry-key","value":"false","name":"text-entry-key"},{"key":"dismissable","value":"false","name":"dismissable"},{"key":"a11y-focused","value":"false","name":"a11y-focused"},{"key":"heading","value":"false","name":"heading"},{"key":"live-region","value":"0","name":"live-region"},{"key":"context-clickable","value":"false","name":"context-clickable"},{"key":"content-invalid","value":"false","name":"content-invalid"}]

3. Tela de Cadastro
  3.1. Ordem dos inputs:
   3.1.1. Nome:
      [{"key":"elementId","value":"00000000-0000-017d-ffff-ffff000005d8","name":"elementId"},{"key":"index","value":"0","name":"index"},{"key":"package","value":"br.com.xapps.paddockfan.android","name":"package"},{"key":"class","value":"android.widget.EditText","name":"class"},{"key":"text","value":" ","name":"text"},{"key":"resource-id","value":"@undefined/input","name":"resource-id"},{"key":"checkable","value":"false","name":"checkable"},{"key":"checked","value":"false","name":"checked"},{"key":"clickable","value":"true","name":"clickable"},{"key":"enabled","value":"true","name":"enabled"},{"key":"focusable","value":"true","name":"focusable"},{"key":"focused","value":"false","name":"focused"},{"key":"long-clickable","value":"true","name":"long-clickable"},{"key":"password","value":"false","name":"password"},{"key":"scrollable","value":"false","name":"scrollable"},{"key":"selected","value":"false","name":"selected"},{"key":"bounds","value":"[108,549][972,622]","name":"bounds"},{"key":"displayed","value":"true","name":"displayed"},{"key":"hint","value":" ","name":"hint"},{"key":"a11y-important","value":"true","name":"a11y-important"},{"key":"screen-reader-focusable","value":"false","name":"screen-reader-focusable"},{"key":"input-type","value":"16385","name":"input-type"},{"key":"drawing-order","value":"1","name":"drawing-order"},{"key":"showing-hint","value":"true","name":"showing-hint"},{"key":"text-entry-key","value":"false","name":"text-entry-key"},{"key":"multiline","value":"false","name":"multiline"},{"key":"dismissable","value":"false","name":"dismissable"},{"key":"a11y-focused","value":"false","name":"a11y-focused"},{"key":"heading","value":"false","name":"heading"},{"key":"live-region","value":"0","name":"live-region"},{"key":"context-clickable","value":"false","name":"context-clickable"},{"key":"max-text-length","value":"5000","name":"max-text-length"},{"key":"content-invalid","value":"false","name":"content-invalid"}]
   3.1.2. Sobrenome.
      [{"key":"elementId","value":"00000000-0000-017d-ffff-ffff000005dc","name":"elementId"},{"key":"index","value":"0","name":"index"},{"key":"package","value":"br.com.xapps.paddockfan.android","name":"package"},{"key":"class","value":"android.widget.EditText","name":"class"},{"key":"text","value":" ","name":"text"},{"key":"resource-id","value":"@undefined/input","name":"resource-id"},{"key":"checkable","value":"false","name":"checkable"},{"key":"checked","value":"false","name":"checked"},{"key":"clickable","value":"true","name":"clickable"},{"key":"enabled","value":"true","name":"enabled"},{"key":"focusable","value":"true","name":"focusable"},{"key":"focused","value":"false","name":"focused"},{"key":"long-clickable","value":"true","name":"long-clickable"},{"key":"password","value":"false","name":"password"},{"key":"scrollable","value":"false","name":"scrollable"},{"key":"selected","value":"false","name":"selected"},{"key":"bounds","value":"[108,790][972,863]","name":"bounds"},{"key":"displayed","value":"true","name":"displayed"},{"key":"hint","value":" ","name":"hint"},{"key":"a11y-important","value":"true","name":"a11y-important"},{"key":"screen-reader-focusable","value":"false","name":"screen-reader-focusable"},{"key":"input-type","value":"16385","name":"input-type"},{"key":"drawing-order","value":"1","name":"drawing-order"},{"key":"showing-hint","value":"true","name":"showing-hint"},{"key":"text-entry-key","value":"false","name":"text-entry-key"},{"key":"multiline","value":"false","name":"multiline"},{"key":"dismissable","value":"false","name":"dismissable"},{"key":"a11y-focused","value":"false","name":"a11y-focused"},{"key":"heading","value":"false","name":"heading"},{"key":"live-region","value":"0","name":"live-region"},{"key":"context-clickable","value":"false","name":"context-clickable"},{"key":"max-text-length","value":"5000","name":"max-text-length"},{"key":"content-invalid","value":"false","name":"content-invalid"}]
   3.1.3. Gênero (dropdown: Masculino | Feminino)
   
   3.1.4. Nacionalidade (dropdown: Brasileira)
   3.1.5. CPF.



4. Tela de Verificação de Email
   Campo para código de verificação
   Botão para reenviar código
   Botão para confirmar verificação
5. Tela Principal (após login)
   Elementos necessários para a "ação específica" que mencionou
   Dicas para Mapeamento Eficiente
   Prioridade de Atributos:

resource-id é geralmente o mais confiável
content-desc é bom para acessibilidade
text pode mudar com o idioma
Use xpath apenas quando necessário
Coordenadas são o último recurso
Elementos Dinâmicos:

Anote se o elemento muda de posição
Registre padrões em elementos de lista
Verificação:

Teste diferentes estados do app (ex: formulário com e sem erros)
Verifique se os IDs mudam entre sessões
