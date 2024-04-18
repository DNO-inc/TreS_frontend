FROM node:18.16.0-alpine as tres-build-base

ENV VITE_API_URL="https://tres.sumdu.edu.ua/api"
ENV VITE_WS_URL="wss://tres.sumdu.edu.ua/api/ws"

WORKDIR /app
COPY . /app
RUN npm config delete proxy
RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=tres-build-base /app/dist /usr/share/nginx/html
COPY ./etc/www/tres.svg /usr/share/nginx/html/tres.svg
COPY ./etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
