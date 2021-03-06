# syntax=docker/dockerfile:1
FROM node:12.18.1
ENV NODE_ENV=production
WORKDIR /LOGIN_APP
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD [ "node","server.js"]