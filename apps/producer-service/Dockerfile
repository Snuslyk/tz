# syntax=docker/dockerfile:1

FROM oven/bun:1-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM deps AS build
COPY . .
RUN bunx nest build producer-service

FROM base AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production
COPY --from=build /app/dist ./dist

EXPOSE 4242
CMD ["bun", "dist/apps/producer-service/main.js"]
