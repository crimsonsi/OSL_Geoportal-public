FROM node:20-slim AS build

WORKDIR /usr/src/app
COPY package*.json ./
COPY . ./
RUN npm install --ignore-scripts
RUN npm run-script build

FROM nginx:stable

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
