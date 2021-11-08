import { Server } from "./server";
import express from "express";
import fs from "fs/promises";
import { join } from "path";

export class ExpressServer implements Server {
  private express: express.Application;

  constructor() {
    this.express = express();
    this.express.use(express.json());
  }

  async listen(port: number) {
    this.setupRoutes();
    return new Promise<void>((resolve) => {
      this.express.listen(port, resolve);
    });
  }

  private async setupRoutes() {
    const router = express.Router();

    const routesPath = join(__dirname, "../../routes/express");
    const files = await fs.readdir(routesPath);
    files.forEach(async (file) => {
      if (!file.endsWith(".map")) {
        const route = await import(`${routesPath}/${file}`).then();
        route.default(router);
      }
    });

    this.express.use("/api", router);
  }
}
