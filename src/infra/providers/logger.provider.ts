export type LoggerOptions = {
  enabled?: boolean;
  engine: "pinno" | "console";
  pinnoOptions?: {};
};

export class Logger {
  constructor(private loggerInstance: any) {}

  public info(data: any) {
    this.loggerInstance.info(data);
  }
  public error(data: any) {
    this.loggerInstance.error(data);
  }
  public warn(data: any) {
    this.loggerInstance.warn(data);
  }
  public debug(data: any) {
    this.loggerInstance.debug(data);
  }
}

export let logger: Logger = new Logger({
  debug() {},
  info() {},
  log() {},
  warn() {},
  error() {},
});

export async function buildLogger({ enabled, engine }: LoggerOptions) {
  if (!enabled) {
    return;
  }

  switch (engine) {
    case "pinno":
      const pinno = await import("pino");
      logger = new Logger(pinno.pino());
      break;
    default:
      logger = new Logger(console);
      break;
  }
}
