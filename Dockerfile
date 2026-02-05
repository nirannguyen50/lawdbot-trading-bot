FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Create necessary directories
RUN mkdir -p memory agents

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]