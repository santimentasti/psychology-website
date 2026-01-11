# ===================================
# Backend Dockerfile - Express + Prisma
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
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/

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
COPY backend ./backend
COPY shared ./shared
COPY package*.json ./

# Generate Prisma client and build
RUN npm run build --workspace=backend

# ===================================
# Production Stage
# ===================================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built files and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package.json ./backend/package.json
COPY --from=builder /app/backend/prisma ./backend/prisma
COPY --from=builder /app/package.json ./package.json

# Expose port (Railway will set PORT env var)
EXPOSE 3000

# Run migrations and start server
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./backend/prisma/schema.prisma && node backend/dist/backend/src/index.js"]
