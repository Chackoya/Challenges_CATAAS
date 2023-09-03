# Base Image
FROM node:18.17.1

# Update package list and install mysql-client
RUN apt-get update -y \
    && apt-get install -y default-mysql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* 

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Explicitly copy config file
COPY config/env_config.js /usr/src/app/config/env_config.js
#Copy catImages folder
COPY ./catImages /usr/src/app/catImages

# Copy the current directory contents into the container
COPY . .


# Copy docker-entrypoint.sh and give execute permission
COPY docker-entrypoint.sh /usr/src/app/
RUN chmod +x /usr/src/app/docker-entrypoint.sh

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Change to entrypoint
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
