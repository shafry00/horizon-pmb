# Use the official Node.js image as the base  
FROM node:22-alpine  

# Set the working directory inside the container  
WORKDIR /app  

# Copy package.json and package-lock.json to the container  
COPY package*.json ./  

# Install dependencies  
RUN npm i -f

# Copy the app source code to the container  
COPY . .  

RUN npx prisma generate

# Build the Next.js app  
RUN npm run build  

# Expose the port the app will run on  
EXPOSE 3000  

# Start the app  
CMD ["npm", "start"]  
