FROM node:16-alpine

WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm ci
COPY . .

CMD ["npm", "run", "dev"]