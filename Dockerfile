FROM node:8
WORKDIR /usr/src/app

COPY /public /usr/src/app/public
COPY package.json .
COPY config.js .
COPY server.js .


RUN npm install

ENV ENV_NAME prod
ENV REDIS_HOST redis-master.default.svc.cluster.local

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]