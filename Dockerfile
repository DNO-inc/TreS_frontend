FROM node:18.16.0-alpine as tres-build-base

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=tres-build-base /app/dist /usr/share/nginx/html