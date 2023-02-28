FROM node:16.18.1-alpine3.15 as base

WORKDIR /usr/src/app

COPY package*.json ./

ENV PORT=3000

EXPOSE $PORT

RUN npm i

COPY . .

RUN npm run build

FROM base as production

ENV NODE_ENV=production

RUN npm prune

CMD ["npm", "start"]

