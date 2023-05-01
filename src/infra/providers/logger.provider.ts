/* eslint-disable @typescript-eslint/no-empty-function */
export type LoggerOptions = {
    enabled?: boolean;
    engine?: "pino" | "console";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pinoOptions?: any;
};

export class Logger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private loggerInstance: any) {}

    public info(data: unknown, msg?: string) {
        this.loggerInstance.info(data, msg);
    }
    public error(data: unknown, msg?: string) {
        this.loggerInstance.error(data, msg);
    }
    public warn(data: unknown, msg?: string) {
        this.loggerInstance.warn(data, msg);
    }
    public debug(data: unknown, msg?: string) {
        this.loggerInstance.debug(data, msg);
    }
}

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
        case "pino":
            // eslint-disable-next-line no-case-declarations
            const pino = await import("pino");
            logger = new Logger(pino.pino(pinoOptions));
            break;
        default:
            logger = new Logger(console);
            break;
    }
}
