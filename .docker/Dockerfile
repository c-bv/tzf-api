FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based
COPY package*.json ./
RUN npm ci --loglevel verbose

# Build the TypeScript source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build  

# Production image, copy built JavaScript files and run Express
FROM base AS runner
WORKDIR /app

RUN console.log(process.env.NODE_ENV)

# Create a non-root user for running the application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 express-api-user

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

