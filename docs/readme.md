# Burrito & TreS Project

This is a full-stack web project consisting of:

- **Backend:** [Burrito API](https://github.com/DNO-inc/Burrito) (Python, Dockerized, MySQL, MongoDB, Redis)
- **Frontend:** [TreS Frontend](https://github.com/DNO-inc/TreS_frontend) (React + TypeScript + Vite)

## 🧑‍💻 Getting Started (for Developers)

These steps will get you up and running in a clean environment.

---

### 🔧 Prerequisites

Ensure you have the following installed:

- `git`
- `docker` and `docker-compose`
- `make`
- `node >= 18` and `npm >= 9`
- `python >= 3.10`
- `virtualenv` or `venv`

---

### ⚙️ Cloning the Projects

```bash
git clone https://github.com/DNO-inc/Burrito.git
git clone https://github.com/DNO-inc/TreS_frontend.git
```

## 🐍 Backend Setup (Standalone Mode)

```bash
cd Burrito
cp .env.example .env # or create your own .env file
make dbs # starts MySQL, MongoDB, Redis
docker build -t burrito_api .
docker run --rm -p 8080:8080 --env-file .env --name burrito_api --network burrito_party burrito_api
```

## 🧪 Running Backend in Cluster Mode

```bash
docker-compose -f docker-compose-separated.yml up
```

## ⚛️ Frontend Setup

```bash
cd TreS_frontend
npm install
npm run dev
```

Open http://localhost:3000
