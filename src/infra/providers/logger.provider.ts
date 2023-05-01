export type LoggerOptions = {
  enabled?: boolean;
  engine?: "pino" | "console";
  pinoOptions?: {};
};

export class Logger {
  constructor(private loggerInstance: any) {}

  public info(data: any, msg?: string) {
    this.loggerInstance.info(data, msg);
  }
  public error(data: any, msg?: string) {
    this.loggerInstance.error(data, msg);
  }
  public warn(data: any, msg?: string) {
    this.loggerInstance.warn(data, msg);
  }
  public debug(data: any, msg?: string) {
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
      const pino = await import("pino");
      logger = new Logger(pino.pino(pinoOptions));
      break;
    default:
      logger = new Logger(console);
      break;
  }
}
