# ===================================
# Backend Dockerfile - Express + Prisma
# Standalone build (when Root Directory = backend)
# ===================================

FROM node:18-alpine AS base

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# ===================================
# Dependencies Stage
# ===================================
FROM base AS deps

# Copy package files
COPY package*.json ./

# Install all dependencies (ignore scripts to prevent premature builds)
RUN npm ci --ignore-scripts

# ===================================
# Build Stage
# ===================================
FROM base AS builder

WORKDIR /app

# Copy dependencies (everything is hoisted to the root in workspaces)
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Generate Prisma client and build
RUN npx prisma generate && npm run build

# ===================================
# Production Stage
# ===================================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built files and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Run migrations and start server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/backend/src/index.js"]
