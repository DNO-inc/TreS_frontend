# Production Deployment Guide

## 1. Requirements

### Hardware (minimum)

- CPU: 2+ cores
- RAM: 4 GB
- Disk: 10 GB+ (SSD preferred)

### Software

- Docker Engine
- Docker Compose
- Git

### Network

- Expose ports: 80, 443, 3000, 8080

- Configure firewall accordingly

## 2. Steps

```bash
git clone https://github.com/DNO-inc/Burrito.git
cd Burrito
cp .env.prod .env
make dbs
docker-compose -f docker-compose-separated.yml --env-file .env up -d
```

## 3. Verify

- API: http://<domain>:8080/api/health
- Frontend: http://<domain>:3000
- Check containers: docker ps
