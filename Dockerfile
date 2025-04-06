######################################
### install-deps #####################
######################################
FROM node:18 AS deps

COPY ["package.json", "package-lock.json", "/project/"]

WORKDIR /project

RUN npm ci

######################################
### libraries ########################
######################################
FROM deps AS builder-ngx

COPY ["angular.json", "tsconfig.json", "./"]

COPY ./projects/ngx-mechanics ./projects/ngx-mechanics
RUN npm run build ngx-mechanics

COPY ./projects/ngx-wxc ./projects/ngx-wxc
RUN npm run build ngx-wxc

COPY ./projects/ngx-widget ./projects/ngx-widget
RUN npm run build ngx-widget


######################################
### backoffice ####################
######################################
FROM builder-ngx AS builder-backoffice

# Copy et build du backoffice
COPY ./projects/backoffice ./projects/backoffice/
RUN npm run build backoffice --prod

######################################
### nginx ############################
######################################
FROM nginx:latest

COPY ./projects/backoffice/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder-backoffice /project/dist/backoffice /usr/share/nginx/html


EXPOSE 80


