FROM node:8
WORKDIR /usr/src/app
ADD package.json .
ADD config.js .
ADD server.js .
ADD public/ .

RUN npm install


ENV ENV_NAME prod
ENV REDIS_URL redis

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]