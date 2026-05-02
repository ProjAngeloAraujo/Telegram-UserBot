import { UserBotConnect } from "./userbot/userbot.connect.js";

(async () => {
    console.log("--- Iniciando a conexão com o Telegram ---");

    try {

        const connect = new UserBotConnect();
        await connect.iniciar();

    } catch(err) {
        console.error("Erro ao conectar:", err);
    }

    console.log("--- Finalizando a conexão com o Telegram ---");
})();