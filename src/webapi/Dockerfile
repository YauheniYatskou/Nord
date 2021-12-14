FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4000
ENV PORT 4000
ENV NODE_ENV production
ENV VERSION 1.0
CMD [ "node", "./src/app.js" ]