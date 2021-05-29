FROM node:14-alpine as node_base

## Install deps
FROM node_base as deps
WORKDIR /usr/src/app
RUN npm install nodemon -g --save
COPY package*.json ./
RUN npm install 

# Create app directory
FROM node_base as build
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules /usr/src/app/node_modules

# Bundle app source
COPY . .

CMD ["npm", "run", "start"]
EXPOSE 3000
