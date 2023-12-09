import Logger, { type ILogger } from "js-logger";

Logger.useDefaults();

export function getAppLogger(name: string): ILogger {
    return Logger.get(`SHRED App ${name}`);
}
