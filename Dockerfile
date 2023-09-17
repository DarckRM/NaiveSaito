FROM nginx:mainline-alpine3.18-slim

WORKDIR /home/app

ADD dist/templates/assets ./assets
ADD dist/templates/favicon.ico ./
ADD dist/templates/index.html ./