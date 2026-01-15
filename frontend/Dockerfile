# ===================================
# Frontend Dockerfile - React + Vite
# Standalone build (when Root Directory = frontend)
# ===================================

FROM node:18-alpine AS base

WORKDIR /app

# ===================================
# Dependencies Stage
# ===================================
FROM base AS deps

# Copy package files
COPY package*.json ./

# Install dependencies (using npm install due to lock file sync issues)
RUN npm install --ignore-scripts

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

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 (Railway will map this)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
