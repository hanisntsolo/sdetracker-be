# Use a Node.js base image with the desired version
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --production

# Copy the rest of the application files to the container
COPY . .

# Expose the port that your Node.js app is listening on (adjust as needed)
EXPOSE 8088

# Start the Node.js application
CMD ["node", "app.js"]
