import Logger, { ILogger } from "js-logger";

Logger.useDefaults();

export function getContentScriptLogger(name: string): ILogger {
    return Logger.get(`SHRED Content-Script ${name}`);
}
