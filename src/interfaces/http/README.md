# Overview

Http Interface is implemented when we create a http application with the application factory, follow the examples below:

## Summary

[Setup]()
[Routes/Controller](https://github.com/kevingamaa/typescript-backend-example/blob/main/src/interfaces/http/README.md#routecontroller-declaration)
[Error Handling](https://github.com/kevingamaa/typescript-backend-example/blob/main/src/interfaces/http/README.md#routecontroller-declaration)

## Setup example

```typescript
import { ExpressServer } from "@interfaces/http/server/expres-server";
import { MysqlConnection } from "@infra/database/mysql/connection";
import { ApplicationFactory } from "@infra/core/application.factory";
import config from "@infra/config";

async function main() {
    const expressServer = new ExpressServer();
    const mysqlConnection = new MysqlConnection();

    const app = await ApplicationFactory.createHttpApplication({
        httpServer: expressServer,
        databases: [mysqlConnection],
        logger: {
            engine: "pino",
            pinoOptions: {
                // this transport is optional and dev recommend only
                transport: {
                    target: "pino-pretty",
                },
            },
        },
    });
    app.listen(config.application().PORT);
}
main();
```

## Route/Controller declaration

Since our core implementation is with express the routes need to be declared using the express `Router` object and our adapter for the application controllers, follow an example:

```typescript
// interfaces/http/routes/app.route.ts
import express from "express";
import { AppController } from "../controllers";
import { routeController } from "../adapters/express-route-controller.adapter";

const appRouter = express.Router();
appRouter.get("/", routeController(AppController.get));
appRouter.post("/", routeController(AppController.post));
appRouter.put("/", routeController(AppController.put));
appRouter.get("/error", routeController(AppController.errorHandlingExample));

export default appRouter;
```

In the controller you have several options to send the response, follow some examples below:

```typescript
// interfaces/http/controllers/app.controller.ts
import { AppRequest, HttpStatus, NotFoundException } from "@infra/common/http";

export async function get(appRequest: AppRequest) {
    const data = "Hello world";
    return data; // default status going to be 200 OK
}

export async function put({ body }: AppRequest) {
    const data = "Hello world";
    return {
        body: data,
        status: HttpStatus.OK,
    };
}

export async function post({ body }: AppRequest) {
    const data = "Hello world";
    return new Response(data, {
        // using original node response
        status: HttpStatus.CREATED,
    });
}

export async function errorHandlingExample({ body }: AppRequest) {
    throw new NotFoundException();
}
```

Note we can use the original class `Response` of NodeJs to send custom status response with headers and everything else you need related to the response.

## Error Handling

For error we have a bunch of errors exception declared in the `src/infra/common/http/exceptions.ts`, if you need a custom error go ahead in the path and declare one for you. Example below:

```typescript
// src/infra/common/http/exceptions.ts
export class CustomException extends ResponseException {
    constructor(msg = "Mal formed body") {
        super(msg, HttpStatus.BAD_REQUEST);
    }
}
```

in the controller you just use it like the example below:

```typescript
// interfaces/http/controllers/app.controller.ts
import { AppRequest, HttpStatus, NotFoundException } from "@infra/common/http";
export async function errorHandlingExample({ body }: AppRequest) {
    throw new CustomException();
}
```

the response will be

```typescript
// status 400x BAD REQUEST
{
    message: "Mal formed body";
}
```
