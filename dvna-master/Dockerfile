# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to the root of your project
WORKDIR .

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Expose port 9090 (change this if your app uses a different port)
EXPOSE 9090

# Set environment variable
ENV NODE_ENV production

# Command to run your app
CMD ["npm", "start"]
