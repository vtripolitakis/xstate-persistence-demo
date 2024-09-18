# Use the official Node.js image from the Docker Hub
FROM node:20

# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
