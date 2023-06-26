/* eslint-disable @typescript-eslint/no-empty-function */
import { Logger } from "./logger.provider";
import { LoggerOptions } from "./types";

export let logger: Logger = new Logger({
    debug() {},
    info() {},
    log() {},
    warn() {},
    error() {},
    trace() {},
});

let started: boolean;

export async function buildLogger({ enabled, loggerInstance }: LoggerOptions) {
    if (!enabled || started) {
        return;
    }
    started = true;
    logger = new Logger(loggerInstance ?? console);
}
