# Overview

This is a back-end clean architecture project designed with the following technologies:

```bash
  node -v
  # v16+
  tsc -v
  # version 4.4.+
```

## Summary

-   [Setup and Install](https://github.com/kevingamaa/typescript-backend-example/blob/main/README.md#setup-and-install)
-   [Logging Configuration](https://github.com/kevingamaa/typescript-backend-example/blob/main/README.md#logging)
-   [Migration, Seeders, and Database related stuff](https://github.com/kevingamaa/typescript-backend-example/blob/main/README.md#database)
-   [HTTP Application documentation Routes/Controller/Error Handling](https://github.com/kevingamaa/typescript-backend-example/tree/main/src/interfaces/http)

##### Directory structure

```bash
-- src/
---- app/
---- infra/
---- interfaces/
```

## Setup and Install

Steps to setup everything is simple 4 steps to do, follow the steps below:

##### 1º - Git Clone

In your terminal go in the directory where you want to clone the project

```bash
git clone https://github.com/kevingamaa/typescript-backend-example.git
```

##### 2º - Environment

you will notice that we have the `.env.example` file in the root directory, create another file named `.env`, and copy and paste the content from `env.example` in your `.env` file. It's something like this.

```bash
APP_NAME='Back-end example'
APP_LOGS=true

MYSQL_PORT=3306
MYSQL_HOST='db'
MYSQL_DATABASE='app'
MYSQL_USERNAME='root'
MYSQL_PASSWORD='example'
```

##### 3º - Dependencies

The project is decoupled from any third parties libraries, so if you decide to work with another logging library or database ORM the choice is up to you, in case yes go ahead and adjust the dependencies and create the adapters for whatever you integrating with. In the meanwhile, we're working with [typeorm](https://typeorm.io/) as our ORM, [express](https://expressjs.com/pt-br/) to provide an HTTP interface and [pinno](https://github.com/pinojs/pino) for logging. Finally to install everything you run:

```bash
npm install
```

##### 4º - Build and Running

If you're here I'll guess everything went great and you only need to get the project running for that go ahead and run the script below in your terminal:

```bash
npm start:dev
```

after your application started you should check if the localhost:3000 or localhost:3200 receive the response "hello world"

---

#### Production

It would be the following commands

```bash
npm run build
```

and then

```bash
npm start
```

---

#### docker setup

In case you prefer to use docker, there is a docker-compose file binding everything you need to get the project running

```bash
docker compose up
```

!!!Remember in case of using docker every command should be executed inside the container!!!

## Logging

In case you need to visualize better your terminal output if you're using Pino as your logging tool just install [pino-pretty](https://github.com/pinojs/pino-pretty) with the following command:

```bash
npm install --save-dev pino-pretty
```

and then in the `src/main.ts` file, you edit the line creating your application with the following configuration for pretty log

```typescript
  const app = await ApplicationFactory.createHttpApplication({
    logger: {
      engine: "pino",
      pinoOptions: {
        transport: {
          target: "pino-pretty", // this will load pino pretty
        },
      },
    },
    ...
  })
```

## Database

The following commands for database connection was implemented with [typeorm](https://typeorm.io/), if you feel that you should be using a different ORM go ahead and change, but would be necessary to config the CLI for your setup.
