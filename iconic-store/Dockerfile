FROM node:20-alpine AS deps

WORKDIR /app/iconic-store

COPY iconic-store/package*.json ./
RUN npm ci

FROM node:20-alpine AS builder

WORKDIR /app/iconic-store

ARG NEXT_PUBLIC_API_URL=http://localhost:4000/api
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY --from=deps /app/iconic-store/node_modules ./node_modules
COPY iconic-store .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app/iconic-store

ENV NODE_ENV=production

COPY --from=builder /app/iconic-store/.next ./.next
COPY --from=builder /app/iconic-store/public ./public
COPY --from=builder /app/iconic-store/package*.json ./
COPY --from=builder /app/iconic-store/node_modules ./node_modules
COPY --from=builder /app/iconic-store/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "run", "start"]
