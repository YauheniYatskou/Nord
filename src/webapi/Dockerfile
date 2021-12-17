FROM node:fermium-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent --no-optional --only=production
COPY . .
ARG ENTITY_API_PORT
EXPOSE ${ENTITY_API_PORT}
ENV PORT ${ENTITY_API_PORT}
ARG ENTITY_API_ENV
ENV NODE_ENV ${ENTITY_API_ENV}
ARG ENTITY_API_VERSION
ENV VERSION ${ENTITY_API_VERSION}
CMD [ "node", "./src/app.js" ]