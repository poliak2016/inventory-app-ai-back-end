#1. Base image
FROM node:20-alpine

# 2. App directory inside container 
WORKDIR /app

# 3. Copy dependency files first (for cache)

COPY package*.json ./

# 4. Install dependecies 

RUN npm install 

# 5.  Copy app source 

COPY . .

# 6. Expose API port 
EXPOSE 3000

# 7. Start the app

CMD ["npm", "run", "dev"]