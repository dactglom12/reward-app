# Deployment Guide

## Client is deployed and hosted on Vercel using Namecheap custom domain setup

Steps: - Log in to Namecheap to see domain info and DNS config - Log in to Vercel and import this repository - Follow Vercel DNS setup guide

Required ENV variables: 1. REACT_APP_API_URL - url to server -> api.<client-domain-name>

## Server is deployed to AWS EC2 Instance

### Domain name is set to api.<client-domain-name>

Steps: - Install Docker, Git on Instance - Clone repository - Install Certbot - Issue SSL certificate - Run bash script `build_docker_with_ssl.sh`

Required ENV variables: 1. DB_URL - MongoDB URL 2. PORT - port (used only in dev mode for localhost server) 3. TOKEN_SECRET - secret for JWT token 4. REACT_APP_DOMAIN - used for sending http only cookie 5. AWS_ACCESS_KEY_ID - required for AWS config 6. AWS_SECRET_ACCESS_KEY - required for AWS config 7. AWS_REGION - required for AWS config
