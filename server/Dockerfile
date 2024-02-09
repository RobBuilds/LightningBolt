# Use an official Node runtime as the parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install any dependencies
RUN npm install --legacy-peer-deps && apt-get update && apt-get install -y wget gnupg \
    && wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


# Bundle app source inside Docker image
COPY . .

# Your server binds to port 4000, so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 4000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "src/server.js"]
