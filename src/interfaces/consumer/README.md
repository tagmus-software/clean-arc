# Overview

Consumers Interface are implemented when we create a microservice application to consume a queue from Kafka, RabbitMQ or any queue service you have in mind

## Summary

[Setup]()

## Setup example

```typescript
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
```

## Declaring Consumer
