import Logger, { type ILogger } from "js-logger";

Logger.useDefaults();

export function getApiLogger(name: string): ILogger {
    return Logger.get(`SHRED Api ${name}`);
}
