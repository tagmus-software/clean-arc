import { buildLogger, LoggerOptions } from "@infra/providers/logger.provider";
import { Database } from "@infra/database/database";

export interface ApplicationConfiguration {
  databases: Database<unknown>[];
  logger?: LoggerOptions;
}

export class Application {
  constructor(protected configuration: ApplicationConfiguration) {
    this.setupLogger(this.configuration.logger);
  }
  public async listen(port: number): Promise<void> {}

  private async setupLogger(
    loggerOptions: LoggerOptions = { enabled: true, engine: "console" }
  ) {
    await buildLogger(loggerOptions);
  }
}
