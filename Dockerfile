# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your Node.js app will run on
EXPOSE 3000

# Command to start your application with nodemon in development mode
CMD ["npm", "run", "dev"]
