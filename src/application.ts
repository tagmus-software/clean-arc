import { Container } from "./infra/core/container";
import { Database } from "./infra/db/database";
import { Server } from "./infra/webserver/server";
export class Application {
  constructor(private server: Server, private database: Database<any>) {}

  async listen(port: number) {
    await this.database.connect();

    this.registerDependencies();

    this.server.listen(port).then(() => {
      console.log(`Application is running on localhost:${port}`);
    });
  }

  private registerDependencies() {
    Container.register();
  }
}
