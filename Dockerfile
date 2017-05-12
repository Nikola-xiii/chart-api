FROM ubuntu:14.04

RUN apt-get update \
 && apt-get install -y curl \
 && curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - \
 && apt-get install -y nodejs libfontconfig \
 && npm install -g npm@latest \
 && npm update \
 && apt-get update --fix-missing \
 && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
 && apt-get autoremove -y \
 && ln -s /usr/bin/nodejs /usr/local/bin/node

RUN mkdir /app

WORKDIR /app

COPY /charts /app/charts
COPY server.js server.js
COPY renderer.phantom.js renderer.phantom.js
COPY package.json package.json

# Install app dependencies
RUN npm install

RUN rm -rf /tmp/*

