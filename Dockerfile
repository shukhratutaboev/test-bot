FROM node:16.13-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --only=production
COPY app ./app
COPY public ./public

RUN yarn build --standalone
RUN rm -rf node_modules
RUN rm package.json
RUN yarn cache clean

CMD ["node", ".output/server/index.mjs"]
