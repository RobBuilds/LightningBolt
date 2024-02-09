# Use an official Node runtime as the parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install any dependencies
RUN apt update
RUN apt-get update && apt-get install net-tools
RUN npm install --legacy-peer-deps
RUN npx puppeteer browsers install chrome
RUN apt-get install libnss3 -y
RUN apt-get install libgbm1 -y
RUN apt-get install libasound2 -y
RUN apt-get install -y wget
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

# Bundle app source inside Docker image
COPY . .

# Your server binds to port 4000, so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 4000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "src/server.js"]
