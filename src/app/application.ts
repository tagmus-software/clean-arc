import { ApplicationConfiguration } from "../infra/core/application";
import { Logger } from "../infra/providers/logger.provider";

export class HttpApplication {
  constructor(private configuration: ApplicationConfiguration) {}

  public async listen(port: number) {
    if (this.configuration.databases && this.configuration.databases.length) {
      await Promise.all(
        this.configuration.databases.map(async (d) => {
          try {
            await d.connect();
          } catch (error) {
            console.log(`Error trying to establish database connection`);
          }
        })
      );
    }

    this.configuration.httpServer.listen(port).then(() => {
      console.log(`Application is running on localhost:${port}`);
    });
  }
}
