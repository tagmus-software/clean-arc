import PinoHttp, { HttpLogger } from "pino-http";

type LoggerOptions = {
  enabled?: boolean;
};

type LoggerLibrary = {
  info: (obj: unknown) => void;
  error: (obj: unknown) => void;
  warn: (obj: unknown) => void;
  debug: (obj: unknown) => void;
};
export class Logger {
  static #loggerLibrary: LoggerLibrary;

  public static set loggerLibrary(library) {
    this.loggerLibrary = library;
  }
  public static get loggerLibrary(): LoggerLibrary {
    const logger = {
      info(obj: unknown) {
        console.info(JSON.stringify(obj));
      },
      debug(obj: unknown) {
        console.debug(JSON.stringify(obj));
      },
      warn(obj: unknown) {
        console.warn(JSON.stringify(obj));
      },
      error(obj: unknown) {
        console.error(JSON.stringify(obj));
      },
    };
    return this.#loggerLibrary || logger;
  }

  public static info(obj: unknown) {
    this.loggerLibrary.info(obj);
  }
  public static error(obj: unknown) {
    this.loggerLibrary.error(obj);
  }
  public static warn(obj: unknown) {
    this.loggerLibrary.warn(obj);
  }
  public static debug(obj: unknown) {
    this.loggerLibrary.debug(obj);
  }
}

export class LoggerManager {
  public static init({ enabled }: LoggerOptions = {}) {
    Logger.loggerLibrary = PinoHttp({
      enabled,
    }).logger;

    return Logger;
  }
}
