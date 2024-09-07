import Logger, { type ILogger } from "js-logger";

Logger.useDefaults();

export function getUiLogger(name: string): ILogger {
    return Logger.get(`SHRED UI ${name}`);
}
