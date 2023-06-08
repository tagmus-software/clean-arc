/* eslint-disable @typescript-eslint/no-empty-function */
import { Logger } from "./logger.provider";
import { LoggerEngine, LoggerOptions } from "./types";

export let logger: Logger = new Logger({
    debug() {},
    info() {},
    log() {},
    warn() {},
    error() {},
});

export async function buildLogger({
    enabled,
    engine,
    pinoOptions,
}: LoggerOptions) {
    if (!enabled) {
        return;
    }

    switch (engine) {
        case LoggerEngine.PINO:
            // eslint-disable-next-line no-case-declarations
            const { pino } = await import(LoggerEngine.PINO);
            logger = new Logger(pino(pinoOptions));
            break;
        default:
            logger = new Logger(console);
            break;
    }
}
