import * as dotenv from "dotenv";
dotenv.config();

import application from "./application";
import mysql from "./mysql";
import amqp from "./amqp";

const config = {
    application,
    mysql,
    amqp,
};

export default config;
