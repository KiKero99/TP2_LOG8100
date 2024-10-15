FROM node:18
CMD ["cd", "dvna-master"]
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9090
CMD ["node", "server.js"]
