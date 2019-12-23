FROM node:alpine
WORKDIR "/app"
COPY package.json ./
RUN npm install
COPY api .
CMD ["npm", "run", "start"]
