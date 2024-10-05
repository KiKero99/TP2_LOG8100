FROM node:18

# Set the working directory
WORKDIR /dvna-master

# Copy the package.json and package-lock.json files
COPY dvna-master/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application, including the .env file
COPY dvna-master .

# Expose the port for your app
EXPOSE 9090

# Set the default command to start the app
CMD ["npm", "start"]
