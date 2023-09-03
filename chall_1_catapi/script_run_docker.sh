#!/bin/bash

#SCRIPT TO BUILD AND RUN THE APP. available on http://localhost:3000.




# Build the Docker image
docker build -t challenge1 .

# Stop any running container instances with the name 'challenge1-container'
docker stop challenge1-container || true

# Remove any stopped container instances with the name 'challenge1-container'
docker rm challenge1-container || true

# Run the container
docker run --name challenge1-container -p 3000:3000 challenge1
