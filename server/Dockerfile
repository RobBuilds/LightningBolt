# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Your app binds to port 3000, so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "server.js"]
