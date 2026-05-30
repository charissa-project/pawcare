FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install  # install semua termasuk devDeps

COPY . .
RUN npx prisma generate
RUN npm run build  # nest build butuh @nestjs/cli

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]