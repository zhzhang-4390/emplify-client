FROM node:latest as build-stage
WORKDIR /emplify-client
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /emplify-client
COPY --from=build-stage /emplify-client/dist /emplify-client
RUN mkdir /etc/ssl
COPY /ssl /etc/ssl
COPY nginx.conf /etc/nginx/nginx.conf