FROM node:14

# working directory inside the container
WORKDIR /usr/src/app
COPY package*.json ./

# install dependencies
RUN npm install

COPY . .
EXPOSE 3000
# Run the application
CMD ["npm", "start"]
