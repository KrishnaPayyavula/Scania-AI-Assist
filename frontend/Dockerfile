FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install serve to run the build
RUN npm install -g serve

# Set the command to run the server
CMD ["serve", "-s", "build", "-l", "3000"]