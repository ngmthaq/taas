# Use Node 20 as parent image
FROM node:20.11.1

ARG APP_PORT

ENV APP_PORT=${APP_PORT}

WORKDIR /app

RUN apt-get update -y

COPY package.json yarn.lock ./

RUN npm install -g yarn --force

RUN yarn install

COPY . .

EXPOSE ${APP_PORT}

RUN yarn format:check

RUN yarn build

CMD [ "yarn", "start" ]
