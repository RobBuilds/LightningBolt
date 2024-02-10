# Use an official Node runtime as the parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install any dependencies
RUN apt-get update && apt-get install -y \
    net-tools \
    libnss3 \
    libgbm1 \
    libasound2 \
    wget \
    gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --legacy-peer-deps
RUN npm init -y && npm i puppeteer

# Bundle app source inside Docker image
COPY . .

# Your server binds to port 4000, so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 4000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "src/server.js"]
