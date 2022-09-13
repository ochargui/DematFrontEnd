FROM node:16-alpine as build-stage

WORKDIR /app
COPY package*.json /app/

RUN npm install --legacy-peer-deps


COPY . ./


RUN npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine

COPY --from=build-stage /app/dist/demat-client /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

