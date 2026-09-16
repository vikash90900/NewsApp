# Official Node.js 22 Alpine image
FROM node:22-alpine

# Working directory inside container
WORKDIR /usr/src/app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start application
CMD ["node", "index.js"]
