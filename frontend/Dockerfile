# Development stage
FROM node:22.14-slim AS dev

WORKDIR /app

RUN npm install -g serve

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]

# Production stage
# TODO: Add production stage