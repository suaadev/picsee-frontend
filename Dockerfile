# Multi-stage build for Picsee Frontend

# Stage 1: Build static assets with Node.js
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency manifests and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Build production bundle with Vite
RUN npm run build

# Stage 2: Serve production bundle with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
