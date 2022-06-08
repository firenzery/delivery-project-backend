#!/bin/bash

#IMAGE=firenzery_image
CONTAINER=fire-sql
DB_PASS=Sql@2022

#verify if Docker is installed
if [ -z $(command -v docker) ]; then
        echo "Docker is missing, please install it in order to continue..."
        exit 1
fi

#verify if image does not exist
#if ! docker image inspect $IMAGE >/dev/null 2>&1; then
#        echo "Building image..."
#        docker image build -t $IMAGE . >/dev/null
#fi

#verify it's talking to Daemon
docker info 1>/dev/null 2>&1
if [ $? -ne 0 ]; then
        echo "Cannot talk to the Docker Daemon."
        exit 1
fi

RUNNING=$(docker container inspect --format "{{.State.Running}}" $CONTAINER 2>/dev/null )

#verify the container already exists and it's running or not
if [ $? -ne 0 ]; then
#	VOL_PATH=$(docker volume inspect -f "{{.Mountpoint}}" sqlvolume)
	echo "Start docker run..."
	docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=$DB_PASS" \
	   -v sqlvolume:/var/opt/mssql \
	   -p 3001:1433 --name $CONTAINER --hostname sql1 \
	   -d mcr.microsoft.com/mssql/server:2019-latest
elif [ $RUNNING == "false" ]; then
        echo "Starting container..."
        docker start  $CONTAINER >/dev/null
        if [ $? -ne 0 ]; then
                exit 1
        fi
#        docker container exec -ti $CONTAINER /bin/bash
fi

RESTARTING=$(docker container inspect --format "{{.State.Restarting}}" $CONTAINER 2>/dev/null )


#verify the container is restarting
if [ $RESTARTING == "true" ]; then
        echo "WARNING - The container is restarting..."
        exit 1
fi

