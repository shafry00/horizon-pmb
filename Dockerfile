# Use official Node.js runtime as a parent image
FROM node:22-alpine

# Set work directory
WORKDIR /app

# Copy dependencies and install
COPY package.json ./

RUN npm install

# Copy app source
COPY . .

# Create the uploads directory if it doesn't exist
RUN mkdir -p public/uploads

# Build TypeScript ke JavaScript
RUN npm run build

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start"]
