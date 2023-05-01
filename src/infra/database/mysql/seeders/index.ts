import * as dotenv from "dotenv";
dotenv.config();
import { run } from "./database-seeders";
import { MysqlConnection } from "../connection";

new MysqlConnection().connect().then(run);
