FROM node:16.13.1

WORKDIR /opt/app/
COPY src .

RUN npm install

ENTRYPOINT ["node", "/opt/app/app.js"]