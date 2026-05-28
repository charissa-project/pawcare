FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD sh -c "npm run prisma:deploy && echo 'Migration done, starting server...' && npm run start:prod"