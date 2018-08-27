FROM node:8
WORKDIR /usr/src/app

COPY /public /usr/src/app/public
COPY package.json .
COPY config.js .
COPY server.js .


RUN npm install

ENV ENV_NAME prod
ENV REDIS_URL redis

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]