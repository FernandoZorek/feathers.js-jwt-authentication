FROM node:20-alpine
WORKDIR /app
COPY . .
RUN yarn

EXPOSE 3030

CMD ["yarn", "run", "start"]
