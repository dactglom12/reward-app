#!/bin/bash

# Replace 'your_domain.com' with your actual domain name
domain_name="www.waterproof-jule.online"
docker_image_name="reward-app"

# Function to obtain SSL certificate using Certbot
function obtain_ssl_certificate() {
    echo "Obtaining SSL certificate for $domain_name ..."
    sudo certbot certonly --standalone -d "$domain_name" --agree-tos -n -m dactglom.cloud@gmail.com
}

# Function to check if SSL certificate needs renewal
function needs_renewal() {
    cert_dir="/etc/letsencrypt/live/$domain_name"
    if [ ! -f "$cert_dir/fullchain.pem" ] || [ ! -f "$cert_dir/privkey.pem" ]; then
        return 0 # Files do not exist, renewal needed
    fi

    last_modified=$(stat -c %Y "$cert_dir/fullchain.pem")
    threshold=$(( $(date +%s) - 30*24*60*60 )) # 30 days threshold (in seconds)

    if [ "$last_modified" -lt "$threshold" ]; then
        return 0 # Files are older than threshold, renewal needed
    else
        return 1 # Certificate is up to date, no renewal needed
    fi
}

# Function to build and run the Docker image with SSL configuration
function build_and_run_docker() {
    echo "Building the Docker image..."
    sudo docker build -t "$docker_image_name" .

    echo "Running the Docker container..."
    sudo docker run -p 80:80 -p 443:443 "$docker_image_name"
}

# Step 1: Check if SSL certificate needs renewal
needs_renewal_result=$(needs_renewal)
if [ "$needs_renewal_result" -eq 0 ]; then
    # Step 2: Obtain SSL certificate
    obtain_ssl_certificate
fi

# Step 3: Copy SSL certificate files to the current directory (same as Dockerfile)
echo "Copying SSL certificate files..."
cert_dir="/etc/letsencrypt/live/$domain_name"
sudo cp "$cert_dir/fullchain.pem" ./ssl_certificates/mydomain.crt
sudo cp "$cert_dir/privkey.pem" ./ssl_certificates/mydomain.key

# Step 4: Build and run the Docker image with SSL configuration
build_and_run_docker

# Step 5: Cleanup - Remove the temporary SSL certificate files copied from Let's Encrypt
echo "Cleaning up temporary SSL certificate files..."
sudo rm ./ssl_certificates/mydomain.crt
sudo rm ./ssl_certificates/mydomain.key

echo "Process completed successfully."
