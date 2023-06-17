FROM node:18.16.0-alpine as tres-build-base

ENV VITE_API_URL="https://burrito.tres.cyberbydlo.com"

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=tres-build-base /app/dist /usr/share/nginx/html
COPY ./etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf