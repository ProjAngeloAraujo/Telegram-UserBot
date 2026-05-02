declare module 'input' {
    export function text(message: string): Promise<string>;
    export function select(message: string, choices: string[]): Promise<string>;
    export function confirm(message: string): Promise<boolean>;
}