FROM node:18
WORKDIR ./dvna-master
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9090
CMD ["node", "server.js"]
