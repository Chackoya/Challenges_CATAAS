#!/bin/bash

#SCRIPT TO RUN THE APP, just do ./script_run_docker.sh (run this script)


docker compose build
# Start only MariaDB and Adminer containers
docker compose up -d mariadb adminer

# Wait for MariaDB to become ready
#timeout=120  # Timeout value in seconds
count=0
echo "Waiting for the Database to Start (it might take a minute)..."
#while ! mysqladmin ping -h"mariadb" -P"3306" --silent; do
while ! mysqladmin ping -h"127.0.0.1" -P"3306" --silent; do
    echo "Sleep 5 sec"
    sleep 5
done

# Once MariaDB is ready, start the App container
docker compose up -d app

# Run database migrations
echo "Running database migrations..."

#We setup a config file for the environment, in order to sequelize-cli (migrations & seeding) to detect it...
docker compose exec -T app npx sequelize-cli db:migrate --config config/env_config.js


# Seed the database: 3 rows will be seeded on the database for testing.
echo "Seeding the database..."
#docker compose exec -T app npx sequelize-cli db:seed:all
docker compose exec -T app npx sequelize-cli db:seed:all --config config/env_config.js