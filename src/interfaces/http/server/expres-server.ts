import { HttpServer } from "./http-server";
import express from "express";

export class ExpressServer implements HttpServer {
  private express: express.Application;

  constructor() {
    this.express = express();
    this.express.use(express.json());
  }

  async listen(port: number) {
    return new Promise<void>((resolve) => {
      this.express.listen(port, resolve);
    });
  }
}
