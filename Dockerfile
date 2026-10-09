# Multi-stage Dockerfile for Next.js + Payload CMS + SQLite + Redis

# Stage 1: Base image
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Stage 2: Dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Stage 3: Builder
FROM base AS builder
WORKDIR /app
RUN mkdir -p /app/data /app/media /app/uploads
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 4: Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create persistent storage directories
RUN mkdir -p /app/data /app/media /app/uploads

# Copy necessary production artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/payload.config.ts ./payload.config.ts
COPY --from=builder /app/collections ./collections
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/uploads ./uploads

EXPOSE 3000

# Entrypoint script to seed database if empty, then start server
CMD ["sh", "-c", "npx tsx scripts/seed.mjs && npm start"]
