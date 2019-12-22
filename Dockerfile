FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]

FROM nginx
EXPOSE 3030
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app /usr/share/nginx/html
