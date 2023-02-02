FROM node:16.13-alpine AS builder

WORKDIR /app
# COPY --from=deps /app/.yarn  ./.yarn
COPY . .

RUN yarn install
RUN yarn build --standalone


# just comment
CMD ["node", ".output/server/index.mjs"]
