FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy EVERYTHING Prisma needs
COPY prisma.config.ts ./

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
