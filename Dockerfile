FROM node:20-alpine

ENV MONGO_USER='admin' \
     MONGO_PASS='' \
     MONGO_HOST='' \
     MONGO_PORT=27017 \
     PORT=8080

EXPOSE 8080

RUN mkdir -p /home/app
WORKDIR /home/app

COPY ./app .
RUN npm install

CMD ["node", "server.js"]
