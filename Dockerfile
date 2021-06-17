# Tutorial https://mherman.org/blog/dockerizing-a-react-app/
FROM node:16

WORKDIR /src

ENV PATH /node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

# start app
CMD ["npm", "run", "dev"]