# Use the official Nginx image as base image
FROM nginx:latest



# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./


# Copy the rest of the application files to the container
COPY . .

# Expose port 80 for web traffic
EXPOSE 80


# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
