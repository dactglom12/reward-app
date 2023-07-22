#!/bin/bash

# Function to obtain SSL certificate using Certbot
function obtain_ssl_certificate() {
    echo "Obtaining SSL certificate..."
    sudo certbot certonly --standalone -d www.waterproof-jule.online --agree-tos -n -m dactglom.cloud@gmail.com
}

# Function to build and run the Docker image with SSL configuration
function build_and_run_docker() {
    echo "Building the Docker image..."
    sudo docker build -t reward-app .

    echo "Running the Docker container..."
    sudo docker run -d -p 80:80 -p 443:443 reward-app
}

# Step 1: Obtain SSL certificate
obtain_ssl_certificate

# Step 2: Check if SSL certificate was obtained successfully
if [ ! -f "/etc/letsencrypt/live/your_domain.com/fullchain.pem" ] || [ ! -f "/etc/letsencrypt/live/your_domain.com/privkey.pem" ]; then
    echo "Failed to obtain SSL certificate. Exiting..."
    exit 1
fi

# Step 3: Copy SSL certificate files to the current directory (same as Dockerfile)
echo "Copying SSL certificate files..."
sudo cp /etc/letsencrypt/live/www.waterproof-jule.online/fullchain.pem ./ssl_certificates/mydomain.crt
sudo cp /etc/letsencrypt/live/www.waterproof-jule.online/privkey.pem ./ssl_certificates/mydomain.key

# Step 4: Build and run the Docker image with SSL configuration
build_and_run_docker

# Step 5: Cleanup - Remove the temporary SSL certificate files copied from Let's Encrypt
echo "Cleaning up temporary SSL certificate files..."
sudo rm ./ssl_certificates/mydomain.crt
sudo rm ./ssl_certificates/mydomain.key

echo "Process completed successfully."
