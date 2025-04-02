FROM node:20-alpine AS development

WORKDIR /app

COPY package.json  package-lock.json*  ./

RUN npm i --force or --legacy-peer-deps

################################
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=development /app/node_modules ./node_modules

COPY . .

RUN npm run build

ENV NODE_ENV=production

RUN npm i --only=production --force --legacy-peer-deps && npm cache clean --force --legacy-peer-deps


################################
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

USER node

CMD ["node", "dist/main.js"]
