FROM node:16.17.0-alpine as builder
WORKDIR /app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install



FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
