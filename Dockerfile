# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
# CMD ["node", "./data/index.js"]
# CMD ["node", "./data/optimise.js"]
CMD ["node", "--max-old-space-size=8192", "./restore/one.js"]
