# Backup & Restore Guide

## 1. Strategy

- Full daily backups
- Incremental every 6h (optional)
- Retain 7 days, rotate older

## 2. What to Backup

- MySQL DB
- MongoDB (GridFS, logs)
- Redis snapshot (optional)
- Config files (.env, docker-compose, scripts)

## 3. Backup Scripts (Linux)

```bash
#!/bin/bash
DATE=$(date +%F)
mkdir -p backups/$DATE
docker exec burrito_db mysqldump -uroot -p$MYSQL_ROOT_PASSWORD --all-databases > backups/$DATE/mysql.sql
docker exec burrito_mongo mongodump --archive=backups/$DATE/mongo.archive
docker cp .env backups/$DATE/
```

## 4. Restore Process

```bash
docker exec -i burrito_db mysql -uroot -p$MYSQL_ROOT_PASSWORD < backups/<date>/mysql.sql
docker exec burrito_mongo mongorestore --archive=backups/<date>/mongo.archive
cp backups/<date>/.env .
```

## 5. Verify Backups

- Ensure file size is non-zero
- Test restore on staging once a week
