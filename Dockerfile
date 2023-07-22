# ARG DOMAIN_NAME=www.waterproof-jule.online

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

COPY ./nginx-custom/nginx.conf /etc/nginx/conf.d/default.conf

# Install Certbot
RUN apk add certbot
RUN apk add python3-certbot-nginx

# Run Certbot to obtain SSL certificate during image build
RUN certbot certonly --standalone --agree-tos --nginx --non-interactive --email dactglom.cloud@gmail.com -d www.waterproof-jule.online

# Copy the SSL certificate files to the appropriate location
COPY /etc/letsencrypt/live/www.waterproof-jule.online/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY /etc/letsencrypt/live/www.waterproof-jule.online/privkey.pem /etc/nginx/certs/privkey.pem

# Copy the built React app from the builder stage to the Nginx web root
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port on which your React app will run (Nginx default is 80)
EXPOSE 80
EXPOSE 443

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]