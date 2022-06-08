FROM node:18-alpine 
COPY . /src/app/
WORKDIR /src/app/
RUN apk add --no-cache --update curl bash procps docker openrc
#TODO: see how to get project's base directory
RUN yarn add nodemon -D && yarn install && chmod 777 ./scripts/startDB.sh
#RUN yarn add nodemon -D
EXPOSE 3000
ENTRYPOINT ["/bin/bash"]
