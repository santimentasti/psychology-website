# ===================================
# Frontend Dockerfile - React + Vite
# ===================================

FROM node:18-alpine AS base

WORKDIR /app

# ===================================
# Dependencies Stage
# ===================================
FROM base AS deps

# Copy root package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/

# Install dependencies
RUN npm ci --ignore-scripts

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

# Copy nginx config template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Railway provides PORT env var - nginx:alpine image handles envsubst automatically
# when config is placed in /etc/nginx/templates/ with .template extension

# Default port if PORT not set
ENV PORT=80

# Expose the port (Railway will override with $PORT)
EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]
