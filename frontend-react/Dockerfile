FROM node:14 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

#RUN yarn global add @nestjs/cli
RUN yarn install --production=false

#RUN apt-get -q update && apt-get -qy install netcat

COPY . .

RUN yarn build

CMD ["node", "server.js"]