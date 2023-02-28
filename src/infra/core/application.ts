import { HttpServer } from "../../interfaces/http/server/http-server";
import { Database } from "../database/database";
import { Logger } from "../providers/logger.provider";

export interface ApplicationConfiguration {
  httpServer: HttpServer;

  databases: Database<unknown>[];
}
