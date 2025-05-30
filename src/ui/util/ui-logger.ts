import Logger, { type ILogger } from "js-logger";

// eslint-disable-next-line react-hooks/rules-of-hooks
Logger.useDefaults();

export function getUiLogger(name: string): ILogger {
    return Logger.get(`SHRED UI ${name}`);
}
