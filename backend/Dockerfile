FROM node:20-alpine AS builder

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci

COPY backend/tsconfig.json ./tsconfig.json
COPY backend/src ./src
COPY backend/sql ./sql

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app/backend

ENV NODE_ENV=production

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/sql ./sql
COPY iconic-store/data /app/iconic-store/data

EXPOSE 4000

CMD ["npm", "run", "start:docker"]
