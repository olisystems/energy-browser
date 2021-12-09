# build stage
FROM node:14 as build-stage

# create working directory inside docker image
WORKDIR /app

# Install your app dependencies
COPY /app/package*.json ./

RUN rm -rf app/node_modules package-lock.json && npm install

COPY ./app .
RUN npm run build

# build stage
FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist ./app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]