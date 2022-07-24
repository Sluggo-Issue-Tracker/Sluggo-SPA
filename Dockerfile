# stage 1 - output static files
FROM node:16.16.0 as build-step
WORKDIR /app
COPY . /app
RUN yarn && yarn build

# stage 2 -- configure nginx
FROM nginx
COPY --from=build-step /app/dist /etc/nginx/html/

