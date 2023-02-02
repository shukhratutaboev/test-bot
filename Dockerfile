FROM node:16.13-alpine AS builder

WORKDIR /app

RUN yarn install --only=production
RUN yarn build --standalone
RUN rm -rf node_modules
RUN rm package.json
RUN yarn cache clean

COPY .output/server/index.mjs .

CMD ["node", "index.mjs"]
