FROM node:18
WORKDIR /dvna-master
COPY dvna-master/package*.json ./
RUN npm install
COPY dvna-master .
EXPOSE 9090
CMD ["node", "server.js"]
