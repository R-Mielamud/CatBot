FROM node:latest

ARG PORT

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN ["npm", "install"]

COPY ./src ./src

CMD ["npm", "start"]
EXPOSE $PORT
