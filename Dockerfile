FROM node:14-alpine3.14 as build

WORKDIR /usr/src/app

COPY build ./
COPY nginx ./


FROM nginx:stable

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
