# Use a lightweight Ubuntu image as the base
FROM ubuntu:22.04

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y curl git && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js v18.20.4
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install npm packages globally
RUN npm install -g pm2 serve

# Create app directory
WORKDIR /usr/src/app

# Clone the latest React app from GitHub
RUN git clone https://github.com/brantansp/assertx-react-app.git .

# Install npm packages
RUN npm install express selenium-webdriver axios cors

# Change to the client directory to install dependencies
WORKDIR /usr/src/app/client

# Install local dependencies
RUN npm install

# Install necessary Babel plugin
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Expose the ports the app runs on
EXPOSE 5000
EXPOSE 8080

# Change back to the app root directory
WORKDIR /usr/src/app

# Start the application with pm2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]