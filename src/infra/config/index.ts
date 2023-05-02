import * as dotenv from "dotenv";
dotenv.config();

import application from "./application";
import mysql from "./mysql";

const config = {
    application,
    mysql,
};

export default config;
