# System Update Guide

## 1. Pre-update Checklist

- Notify users
- Backup data
- Check config compatibility
- Plan for downtime if needed

## 2. Update Process

```bash
# Backup (see backup.md)
# Pull latest code
cd Burrito
git pull origin main
# Rebuild
make dbs
docker-compose -f docker-compose-separated.yml down
docker-compose -f docker-compose-separated.yml build --no-cache
docker-compose -f docker-compose-separated.yml up -d
```

## 3. Post-update Checks

- Run integration tests
- Confirm API & DB are operational

## 4. Rollback

```bash
# Restore from backup
# Or checkout previous commit
cd Burrito
git checkout <previous_commit>
docker-compose -f docker-compose-separated.yml up -d
```
