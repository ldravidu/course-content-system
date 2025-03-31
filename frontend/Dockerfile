# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production

# Create directories and set permissions
RUN mkdir -p /tmp/nginx/client_temp && \
    mkdir -p /var/cache/nginx && \
    chmod -R 755 /tmp/nginx && \
    chmod -R 755 /var/cache/nginx && \
    touch /tmp/nginx/nginx.pid && \
    chown -R nginx:nginx /tmp/nginx && \
    chown -R nginx:nginx /var/cache/nginx

# Copy configuration before switching user
COPY nginx-global.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure nginx can access the directories
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /etc/nginx/conf.d

USER nginx

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]