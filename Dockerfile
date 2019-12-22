FROM node:lts-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 3030
CMD ["npm", "run", "start"]

FROM nginx
COPY --from=builder /app /usr/share/nginx/html
COPY --from=builder /app/nginx-conf/default.conf /etc/nginx/conf.d/default.conf

