# ===================================
# Frontend Dockerfile - React + Vite
# ===================================

FROM node:18-alpine AS base

WORKDIR /app

# ===================================
# Dependencies Stage
# ===================================
FROM base AS deps

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# ===================================
# Build Stage
# ===================================
FROM base AS builder

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build argument for API URL (passed at build time)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the app
RUN npm run build

# ===================================
# Production Stage - Serve with nginx
# ===================================
FROM nginx:alpine AS runner

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (Railway will handle port mapping)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
