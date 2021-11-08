# Setup

```bash
docker-compose run --rm  number8 npm i
```

```bash
docker-compose up -d
```

Then in another terminal run the migrations.

```bash
docker-compose run --rm  number8 npm run typeorm migration:run
```

Then is already done, just restart the containers.

```bash
docker-compose down
```

and then

```bash
docker-compose up
```

then your server will be available on localhost:3200
