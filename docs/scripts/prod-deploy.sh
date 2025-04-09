#!/bin/bash
echo "Deploying production environment..."
git pull origin main
make dbs
docker-compose -f docker-compose-separated.yml --env-file .env up -d