export enum LoggerEngine {
    PINO = "pino",
    DEFAULT = "console",
}
export type LoggerOptions = {
    enabled?: boolean;
    engine?: LoggerEngine;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pinoOptions?: any;
};
