FROM node:14.15.4-alpine3.10

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json /app/

RUN npm install

COPY public/ src/ tsconfig.json /app/
