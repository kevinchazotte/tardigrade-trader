FROM node:20-alpine AS build

WORKDIR /app

COPY api/package*.json ./api/
COPY dashboard-shared ./dashboard-shared/
COPY dashboard-shared/package*.json ./dashboard-shared/

RUN npm --prefix ./dashboard-shared install ./dashboard-shared
RUN npm run --prefix ./dashboard-shared build

RUN npm --prefix ./api install ./api

COPY api/. ./api/

RUN npm run build --prefix ./api

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/api/dist ./dist
COPY --from=build /app/api/node_modules ./node_modules
COPY --from=build /app/api/package.json ./package.json

EXPOSE 5000

CMD [ "node", "dist/app.js" ]
