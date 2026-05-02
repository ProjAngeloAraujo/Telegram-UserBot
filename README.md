🤖 Telegram Promo UserBot
Este é um UserBot (robô que utiliza uma conta de usuário real) desenvolvido em Node.js e TypeScript. O objetivo principal é monitorar grupos e canais de promoções no Telegram de forma automatizada, aplicando filtros inteligentes para encontrar apenas os produtos ou ofertas que você deseja.

🚀 Tecnologias Utilizadas
Node.js & TypeScript: Base do desenvolvimento para um código robusto e tipado.

GramJS: Biblioteca MTProto utilizada para interagir com a API do Telegram.

tsx: Executor moderno que permite rodar TypeScript nativamente em módulos (ESM).

dotenv: Gerenciamento de variáveis de ambiente seguras.

🛠️ Estrutura do Projeto
src/connect.ts: Script de autenticação inicial para gerar a StringSession.

src/index.ts: Ponto de entrada que mantém o robô conectado e ouvindo eventos.

src/userbot/message.handler.ts: Onde reside a lógica de filtragem (Keywords, IgnoreWords e TargetChats).


⚙️ Configuração e Instalação
1. Requisitos Prévios
Você precisará de um api_id e um api_hash, que podem ser obtidos em my.telegram.org.

2. Instalação
Bash
npm install
3. Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e preencha com suas credenciais:

Snippet de código
API_ID=12345678
API_HASH=seu_hash_aqui
SESSION=  # Ficará vazio até você rodar o script de conexão
4. Gerando a Sessão
Como este bot usa sua conta pessoal, você precisa gerar uma chave de acesso (Session String) para não precisar logar com senha toda vez:

Bash
npm run connect
Siga as instruções no terminal. O código de login chegará no seu aplicativo oficial do Telegram. Ao final, copie a string gerada e cole no seu .env.

🔍 Como Funcionam os Filtros
O robô utiliza uma lógica de validação tripla para decidir se uma mensagem é relevante:

Filtro de Chats (targetChats): O bot ignora conversas privadas e foca apenas nos IDs dos grupos de promoção configurados.

Lista Negra (ignoreWords): Se a mensagem contiver termos como "esgotado" ou "encerrado", ela é descartada automaticamente.

Lista Branca (keywords): O bot só processa a mensagem se ela contiver palavras de seu interesse (ex: "iPhone", "Monitor", "Cadeira").

☁️ Deploy no Railway
O deploy deste projeto é realizado via Railway para garantir funcionamento 24/7.

Comando de inicialização: O Railway utiliza o script npm start (configurado com tsx).

Variáveis de Ambiente: As chaves API_ID, API_HASH e SESSION devem ser configuradas diretamente no painel de controle do Railway (Variables) para segurança.

📜 Scripts
npm run connect: Autentica sua conta e gera a sessão.

npm run dev: Inicia o bot em modo de desenvolvimento.

npm start: Comando de produção para execução contínua.

Nota de Segurança: Nunca compartilhe sua StringSession ou seu arquivo .env. Eles dão acesso total à sua conta do Telegram.