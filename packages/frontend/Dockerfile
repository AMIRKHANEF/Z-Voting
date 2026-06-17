FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/frontend/package.json packages/frontend/
COPY packages/frontend packages/frontend

RUN npm install
RUN cd packages/frontend && npm install
RUN cd packages/frontend && npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/packages/frontend/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
