FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:frontend-app

FROM node:16-alpine as production
ENV NODE_ENV=production

USER node
WORKDIR /app

COPY --from=development /app/dist/apps/frontend-app ./
RUN npm install --only=production

CMD ["npx", "--yes", "@beam-australia/react-env", "--prefix", "NEXT_PUBLIC", "--", "next", "start"]
