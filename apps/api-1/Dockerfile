FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:api-1

FROM node:16-alpine as production
ENV NODE_ENV=production
ENV PORT=3330
EXPOSE ${PORT}

USER node
WORKDIR /app

COPY --from=development /app/dist/apps/api-1 ./
RUN npm install --only=production

CMD ["node", "main"]
