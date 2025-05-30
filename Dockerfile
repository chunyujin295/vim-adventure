FROM node:14-alpine

ARG APP_DIR

WORKDIR /app
COPY ["src", "package.json", "/app/"]

RUN npm install --production \
  && mkdir -p ${APP_DIR}/saved

CMD ["node", "server.js"]