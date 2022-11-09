FROM node:14.18.1-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.23.2
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/proyfrontendgrupo10 /usr/share/nginx/html
EXPOSE 80