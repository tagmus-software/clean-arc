# Overview

This is a back-end clean architecture project designed with the following technologies:

```bash
  node -v
  # v16+
  tsc -v
  # version 4.4.+
```

##### Directory structure

-- src/
---- app/
---- infra/
---- interfaces/

###### The first path level is split in three different directories

app: for all the business logic and database formating queries to support business and then inside this folder you will find the following structure:

--- repositories // this path is explicit for database comunication
--- services // this path is explicit for business rules

infra: it's everything needed to build the project structure and arquitecture related, errors execeptions, config environments, database modeling with entities or migrations, providers such as redis or logs implementation, core and common functionalities inside the project. Follow the structure explained in detail:

--- common // for everything generic that interacts with interfaces, errors execeptions, business unrelated constants.
--- config // env variables
--- core // functionalities needed to run the project such as adapters, applications bootstraps
--- database // connections, migrations, entities and seeders
--- providers // redis, logs and rabbitmq(services and connections)

interfaces: it's for trasaction data inside in and out of the application, inside the directory we're gonna have jobs, workers, consumers, http api and extra cases if you needed. Follow the structure explained in detail:

--- consumers // queue contracts normally consuming from some rabbitmq, kafka or sqs messages
--- http // all rest api interfaces
--- jobs // normally used to some daily task in a specific time, maybe charge some subscription
--- workers // normally tasks we can do simultaneos with other process that cannot handle everything alone

## Setup and Install

Steps to setup everything is a simple 4 steps to do that, follow the steps bellow:

##### 1º - Environment

you will notice that we have `.env.example` file in the root directory, create another file named `.env` and copy and paste the content from `env.example` in your `.env` file. It's something like this.

```bash
APP_NAME='Back-end example'
APP_LOGS=true

MYSQL_PORT=3306
MYSQL_HOST='db'
MYSQL_DATABASE='app'
MYSQL_USERNAME='root'
MYSQL_PASSWORD='example'
```

##### 2º - Dependencies

The project is decoupled from any third parties libraries, so if you decided yo work with another log library or database orm the choice is up to you, in case yes go ahead adjust the dependencies and create the adapters for whetever you integrating with. In the meanwhile we're working with [typeorm](https://typeorm.io/) as our ORM, [express](https://expressjs.com/pt-br/) to provide http interface and [pinno](https://github.com/pinojs/pino) for logging. Finnaly to install eveything you run:

```bash
npm install
```

##### 3º - Build and Running

If you're here I'll guess everything went great and you only need to get the project running for that go ahead and run the script bellow in your terminal:

```bash
npm start:dev
```

###### Production

It would be the following commands

```bash
npm run build
```

and then

```bash
npm start
```

###### docker setup

In case you're prefer to use docker, there is a docker-compose file binding everything you need to get the project running

```bash
docker compose up
```

## Logging

In case you need to visualize better your terminal output if you're using pino as your logging tool just install [pino-pretty](https://github.com/pinojs/pino-pretty) with the following command:

```bash
npm install --save-dev pino-pretty
```

and then in the `src/main.ts` file you edit the line creating your application with the following configuration for pretty log

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
