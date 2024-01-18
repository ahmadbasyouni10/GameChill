# Docker used to deploy code

# Start with a base image that is built on top of Linux Docker Image
# This will include nodejs
# Build Stage
FROM node:18.19.0 AS builder

# Working directory in the container to /app
WORKDIR /app

# Copy package files into container
COPY package*.json ./

#Install package used in json package
RUN npm install

# Copy app source in the docker image
COPY . .

# Build the app
RUN npm run build

# Production Stage
FROM node:18.19.0

# Install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY package*.json ./

#Only dependencies for production
RUN npm install --only=production

# Copy app from the build stage
COPY --from=builder /app/dist ./dist

# Make port available outside of container
EXPOSE 3000

#Define command (runs once) to run app
CMD ["npm", "run", "serve"]

