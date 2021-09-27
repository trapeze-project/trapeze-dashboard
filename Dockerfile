FROM node:14

ENV ROUTER_BASE="/dashboard/"

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]
