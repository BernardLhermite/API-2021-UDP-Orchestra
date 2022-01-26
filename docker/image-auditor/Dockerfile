FROM node:16.13.1

WORKDIR /opt/app/
COPY ../../../protocol.js .

RUN npm install

ENTRYPOINT ["node", "/opt/app/app.js"]