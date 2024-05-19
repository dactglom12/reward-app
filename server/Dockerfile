# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm run install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Express app is listening on (change it if your app listens on a different port)
EXPOSE 443

# Copy your SSL/TLS certificate and private key to the container
COPY ./ssl_certificates/mydomain.crt /app/certificate.pem
COPY ./ssl_certificates/mydomain.key /app/private_key.pem

# Start your Express app using HTTPS
CMD ["npm", "run" ,"start"]
