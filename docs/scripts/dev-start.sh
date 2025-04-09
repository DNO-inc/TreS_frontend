#!/bin/bash
echo "Starting dev environment..."
cd Burrito
make dbs
docker build -t burrito_api .
docker run --rm -p8080:8080 --env-file .env --name burrito_api --network burrito_party burrito_api &
cd ../TreS_frontend
npm run dev