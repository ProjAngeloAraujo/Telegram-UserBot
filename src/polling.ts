import { MessageHandler } from "./message/message.handler.js";
import { UserBotConnect } from "./userbot/userbot.connect.js";
import { BotDescribe } from "./userbot/userbot.model.js";

(async () => {
    const messageHandler = new MessageHandler(BotDescribe);
    const connect = new UserBotConnect();
    const client = connect.client;

    await connect.connect();

    const dialogs = await client.getDialogs({ limit: 0 });
    const canais = dialogs.filter(d => d.isChannel || d.isGroup);

    console.log(`✅ Conectado. Monitorando ${canais.length} canais/grupos automaticamente.`);

    const lastMessageId = new Map<string, number>();

    for (const canal of canais) {
        if (!canal.entity) continue;
        const key = canal.entity.id.toString();
        try {
            const msgs = await client.getMessages(canal.entity, { limit: 1 });
            if (msgs.length > 0) {
                lastMessageId.set(key, msgs[0].id);
                console.log(`📌 [${canal.title}] Última mensagem: #${msgs[0].id}`);
            }
        } catch {
            // canal inacessível, ignora
        }
    }

    console.log("🔁 Polling iniciado. Verificando a cada 30 segundos...");

    const poll = async () => {
        for (const canal of canais) {
            if (!canal.entity) continue;
            const key = canal.entity.id.toString();
            try {
                const ultimoId = lastMessageId.get(key) ?? 0;

                const msgs = await client.getMessages(canal.entity, {
                    limit: 10,
                    minId: ultimoId,
                });

                if (msgs.length === 0) continue;

                lastMessageId.set(key, msgs[0].id);

                for (const msg of msgs.reverse()) {
                    const text = msg.message;
                    if (!text) continue;

                    console.log(`📨 [${canal.title}] #${msg.id}: ${text.substring(0, 80)}`);

                    const messageValid = await messageHandler.isMessageValid(msg);
                    if (messageValid) {
                        console.log("🔥 Promoção encontrada!");
                        await client.sendMessage("me", {
                            message: `🔥 **Nova Oferta:**\n\n${text}`,
                            parseMode: "md"
                        });
                    }
                }
            } catch {
                // ignora erros pontuais
            }
        }
    };

    await poll();
    setInterval(poll, 30_000);
})();