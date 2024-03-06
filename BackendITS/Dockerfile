FROM node:18.16.1-alpine
WORKDIR /Server
COPY . .
RUN rm -rf node_modules
RUN npm install
CMD ["npm", "start"]
EXPOSE 8080