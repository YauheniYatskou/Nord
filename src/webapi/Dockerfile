FROM node:latest
WORKDIR /usr/src/app
COPY package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
EXPOSE 9229
CMD [ "npm", "start" ]