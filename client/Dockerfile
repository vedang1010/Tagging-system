FROM node:alpine3.18 as build
ARG REACT_APP_SERVER_URL
# ARG SKIP_PREFLIGHT_CHECK

ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
# ENV SKIP_PREFLIGHT_CHECK=$SKIP_PREFLIGHT_CHECK

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN echo "REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL"  # Echo the environment variable

RUN npm run build
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx"."-g","daemon off;" ]