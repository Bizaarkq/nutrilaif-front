FROM node:16.15.1-alpine3.16 as build
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build 

FROM nginx:1.17.1-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist/front-nutri .
ENTRYPOINT ["nginx", "-g", "daemon off;"]