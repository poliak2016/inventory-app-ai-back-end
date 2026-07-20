# 1) Base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# 2) Deps
FROM base AS deps
RUN npm ci

# 3) Dev
FROM deps AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev:docker"]

# 4) Test
FROM deps AS test
ENV NODE_ENV=test
COPY . .
USER node
CMD ["npm", "run", "test:docker"]

# 5) Prod
FROM base AS prod
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
USER node
CMD ["npm", "run", "start"]
