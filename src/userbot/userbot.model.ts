import { BotFilter } from "./userbot.interface.js";

export const BotDescribe: BotFilter =  {
    keywords: ["ps5", "Playstation", "Playstation 5", "PS5", "PlayStation 5", "PlayStation", "Sony", "sony"],
    ignoreWords: ["esgotado", "encerrado", "finalizado", "vendido"],
    targetChats: ["-100123456789", "id_do_grupo_aqui"] 
};
    
