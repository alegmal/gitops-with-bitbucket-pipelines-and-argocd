FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm install

# TypeScript compile
RUN npm run build

EXPOSE 3001
CMD [ "node", "dist/server.js" ]