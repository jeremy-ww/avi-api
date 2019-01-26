FROM node:10

# cache node_module
COPY package-lock.json /tmp/package-lock.json
COPY package.json /tmp/package.json
RUN cd /tmp && npm i

WORKDIR /app

RUN cp -r /tmp/node_modules/. /app/node_modules

COPY . /app

RUN npm i pm2 -g && npm run build

CMD ["npm", "run", "start"]
