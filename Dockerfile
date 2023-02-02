FROM node:16.13-alpine AS builder

WORKDIR /app
COPY front-new-marketplace/src /app/src
COPY front-new-marketplace/package.json /app
COPY front-new-marketplace/yarn.lock /app

RUN yarn install --only=production
RUN yarn build --standalone
RUN rm -rf node_modules
RUN rm package.json
RUN yarn cache clean

CMD ["node", ".output/server/index.mjs"]
