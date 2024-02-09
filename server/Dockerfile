# Use an official Node runtime as the parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install any dependencies
RUN npm install --legacy-peer-deps && npx puppeteer browsers install chrome


# Bundle app source inside Docker image
COPY . .

# Your server binds to port 4000, so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 4000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "src/server.js"]
