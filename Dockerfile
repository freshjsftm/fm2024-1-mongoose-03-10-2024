FROM node:20-alpine

RUN mkdir /server

WORKDIR /server

COPY ./ ./

RUN npm i

EXPOSE 3000

CMD npm run start