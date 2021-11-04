import { Framework } from "../framework";
import { InjectedController } from "../../../types/injected_controller";
import express from "express";
import { expressRouterAdapter } from "../../adapters/express_router";

export class ExpressApplication implements Framework {
  private app!: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  public bindRoutes(controllers: InjectedController[]) {
    controllers.forEach((controller) => {
      const controllerRoutes = expressRouterAdapter(controller);

      this.app.use(controllerRoutes.prefix, controllerRoutes.router);
    });
  }

  public async listen(port: number): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(port, resolve);
    });
  }
}
