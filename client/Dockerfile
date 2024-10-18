# Use a Node.js 18 base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
