FROM node:alpine

RUN apk update && apk upgrade

# Install the application
COPY app/ /app

RUN cd /app && npm install

ENV WEB_PORT 3000
EXPOSE  3000

# Define command to run the application when the container starts
CMD ["node", "/app/app.js"]
