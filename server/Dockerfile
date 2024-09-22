FROM node:20
LABEL authors="level"
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
EXPOSE 4000
CMD [ "pnpm", "start" ]

