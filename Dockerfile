FROM node:16.13-alpine AS builder

ENV NUXT_VERSION=3.0.0

WORKDIR /app
# COPY --from=deps /app/.yarn  ./.yarn
COPY . .

RUN yarn install
RUN yarn build --standalone
RUN rm -rf node_modules
RUN rm package.json
RUN yarn add "nuxt-start@${NUXT_VERSION}"
RUN yarn cache clean


# just comment
ENTRYPOINT ["npx", "nuxt-start"]
