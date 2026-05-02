import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import * as input from "input"; 
import dotenv from "dotenv";

dotenv.config();

export class UserBotConnect {

    public client: TelegramClient;
    private apiId: number = Number(process.env.API_ID);
    private apiHash: string = process.env.API_HASH || "";
    private stringSession: StringSession = new StringSession(process.env.SESSION || "");

    constructor() {
        if (!this.apiId || !this.apiHash) {
            throw new Error("❌ API_ID ou API_HASH não encontrados no .env");
        }

        this.client = new TelegramClient(
            this.stringSession, 
            this.apiId, 
            this.apiHash, 
            { connectionRetries: 5 }
        );
    }

    public async iniciar(): Promise<void> {
        console.log("Iniciando conexão com o Telegram...");
        
        await this.client.start({
            phoneNumber: async () => await input.text("Digite seu número (+55...): "),
            password: async () => await input.text("Senha 2FA (se houver): "),
            phoneCode: async () => await input.text("Código recebido: "),
            onError: (err) => console.error("Erro no login:", err),
        });

        console.log("Conectado!");
        
        console.log("\n--- COPIE A SESSÃO ABAIXO E SALVE NO SEU .ENV NO CAMPO SESSION ---");
        console.log(this.client.session.save());
        console.log("------------------------------------------------------------------\n");
    }
}