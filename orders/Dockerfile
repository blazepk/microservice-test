FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev --force
COPY . .

CMD ["npm", "start"]