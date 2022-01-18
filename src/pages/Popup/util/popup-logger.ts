import Logger, { ILogger } from "js-logger";

Logger.useDefaults();

export function getPopupLogger(name: string): ILogger {
    return Logger.get(`SHRED Popup ${name}`);
}
