import { MessageHandler } from "./message/message.handler.js";
import { UserBotConnect } from "./userbot/userbot.connect.js";
import { BotDescribe } from "./userbot/userbot.model.js";
import { NewMessage } from "telegram/events/index.js"; 

(async () => {
    const messageHandler = new MessageHandler(BotDescribe);
    const connect = new UserBotConnect();
    const client = connect.client;

    try {
        
        console.log("🚀 Iniciando conexão com o Telegram...");
        await client.connect();
        await connect.connect();

        console.log("🔐 Validando autorização...");
        const isAuthorized = await client.checkAuthorization();

        if (!isAuthorized) {
            console.error("❌ Sessão inválida! Rode o seu arquivo de login primeiro.");
            return;
        }

        console.log("✅ Tudo conectado. Monitorando promoções...");

        client.addEventHandler(async (event) => {
            const messageValid = await messageHandler.isMessageValid(event.message); 
            
            if (messageValid) {
                console.log("🔥 Promoção encontrada! Enviando para 'Mensagens Salvas'...");
                await client.sendMessage("me", {
                    message: `🔥 **Nova Oferta:**\n\n${event.message.text}`,
                    parseMode: "md" 
                });
            }
        }, new NewMessage({})); 

        console.log("📌 Pressione Ctrl+C para encerrar.");
        
    } catch (err) {
        console.error(`❌ Erro crítico:`, err);
    }
})();