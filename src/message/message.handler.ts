import { Api } from "telegram";
import { BotFilter } from "../userbot/userbot.interface.js";


export class MessageHandler {
    private filter: BotFilter;

    constructor(filter: BotFilter) {
        this.filter = filter;
    }

    public async isMessageValid (message: Api.Message): Promise<boolean> {
        if(!message.text) return false;

        const textLower = message.text.toLowerCase();

        const containsIgnore = this.filter.ignoreWords.some(word => 
            textLower.includes(word.toLowerCase())
        );

        const matchedKeyword = this.filter.keywords.find(word => 
            textLower.includes(word.toLowerCase())
        );

        return !containsIgnore && matchedKeyword !== undefined;
    }
}