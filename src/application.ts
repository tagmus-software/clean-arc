import { Container } from "./core";
import { Database } from "./infra/db/database";
import { Framework } from "./main/frameworks/framework";
import { InjectedController } from "./types/injected_controller";
import { LOGGER } from "./core/logger";
import app from "./config/app";

export class Application<T> {
  private logger = LOGGER;
  constructor(private database: Database<T>, private framework: Framework) {}

  public async listen(port: number) {
    const _port = Number(process.env.NODE_PORT || port);

    // await this.database.connect().catch((reason) => {
    //   this.logger.error(reason);
    // });

    const injectedControllers: InjectedController[] = app.controllers.map(
      (controller) => ({
        instance: Container.get(controller),
        class: controller,
      })
    );

    this.framework.bindRoutes(injectedControllers);

    this.framework.listen(_port).then(() => {
      console.log(`The server is online on localhost:${_port}`);
    });
  }
}
