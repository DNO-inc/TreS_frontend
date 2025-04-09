#!/bin/bash
DATE=$(date +%F)
mkdir -p backups/$DATE
docker exec burrito_db mysqldump -uroot -p$MYSQL_ROOT_PASSWORD --all-databases > backups/$DATE/mysql.sql
docker exec burrito_mongo mongodump --archive=backups/$DATE/mongo.archive
docker cp .env backups/$DATE/