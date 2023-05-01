import express from "express";
import { HttpServer } from "@interfaces/http/http-server";

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
