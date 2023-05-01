import express from "express";
import { HttpServer } from "../http-server";
import appRouter from "../routes/app.route";
import { loggerMiddleware } from "../middlewares/log.middleware";

export class ExpressServer implements HttpServer {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(loggerMiddleware);
    this.routes();
  }

  public async routes() {
    this.app.use(appRouter);
  }

  async listen(port: number) {
    return new Promise<void>((resolve) => {
      this.app.listen(port, resolve);
    });
  }
}
