FROM node:18-alpine

WORKDIR /app

# Copy root files
COPY package.json package-lock.json ./
COPY packages/backend/package.json packages/backend/
COPY packages/backend/src packages/backend/src

# Install dependencies
RUN npm install
RUN cd packages/backend && npm install

# Build backend
RUN cd packages/backend && npm run build

EXPOSE 3001

CMD ["npm", "--prefix", "packages/backend", "start"]
