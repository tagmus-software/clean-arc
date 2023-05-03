import "reflect-metadata";
import { MysqlConnection } from "@infra/database/mysql/connection";
import { ApplicationFactory } from "@infra/core/application.factory";
import { CONSUMERS } from "@interfaces/consumer";

async function bootstrap() {
    const mysqlConnection = new MysqlConnection();

    const microservice = await ApplicationFactory.createMicroserviceApplication(
        {
            databases: [mysqlConnection],
            consumers: CONSUMERS,
        }
    );
    microservice.listen();
}

bootstrap();
