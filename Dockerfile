FROM node:18

WORKDIR /app

RUN apt-get update && apt install nano -y

COPY package.json /app

RUN npm install

COPY . /app

CMD ["npm", "start"]

