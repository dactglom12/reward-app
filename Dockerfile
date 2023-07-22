# Stage 1: Build the React app using Node.js
FROM node:16.20.0 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install app dependencies using Yarn
RUN yarn install

# Copy the entire app directory to the container
COPY . .

# Build the React app
RUN yarn build

# Stage 2: Create a lightweight production image with Nginx
FROM nginx:alpine

# Install openssl in the Nginx container
RUN apk update && apk add --no-cache openssl

# Copy the SSL certificate files to the container
COPY ./ssl_certificates/mydomain.crt /etc/nginx/ssl/
COPY ./ssl_certificates/mydomain.key /etc/nginx/ssl/

# Copy the custom Nginx configuration with SSL settings
COPY ./nginx-custom/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the builder stage to the Nginx web root
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port on which your React app will run (Nginx default is 80)
EXPOSE 80
EXPOSE 443

# Start Nginx with SSL configuration to serve the React app
CMD ["nginx", "-g", "daemon off;"]
