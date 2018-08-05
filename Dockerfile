FROM node:8-alpine

WORKDIR /usr/src/app

RUN yarn global add serve

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

ENV PORT 3001

CMD ["serve", "-s", "build"]
