import Logger, { type ILogger } from "js-logger";

// eslint-disable-next-line react-hooks/rules-of-hooks
Logger.useDefaults();

export function getApiLogger(name: string): ILogger {
    return Logger.get(`SHRED Api ${name}`);
}
