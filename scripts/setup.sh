#!/bin/bash

IMAGE=firenzery_image
CONTAINER=firenzery

#verify if Docker is installed
if [ -z $(command -v docker) ]; then
	echo "Docker is missing, please install it in order to continue..."
	exit 1
fi

#verify if image does not exist
if ! docker image inspect $IMAGE >/dev/null 2>&1; then
	echo "Building image..." #TODO: verify how to get project's base directory
	docker image build -t $IMAGE . # >/dev/null 	
fi

#verify it's talking to Daemon
docker info 1>/dev/null 2>&1
if [ $? -ne 0 ]; then
	echo "Cannot talk to the Docker Daemon."
	exit 1
fi


RUNNING=$(docker container inspect --format "{{.State.Running}}" $CONTAINER 2>/dev/null )

#verify the container already exists and it's running or not
if [ $? -ne 0 ]; then
	WK_DIR=$(pwd)
	echo "Start docker run..."
	docker container run --name $CONTAINER -v $WK_DIR:/src/app -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 --network="host"  -ti firenzery_image
	#docker container run --name $CONTAINER -p 3000:3000 -ti firenzery_image
elif [ $RUNNING == "false" ]; then
	echo "Starting container..."
	docker start  $CONTAINER >/dev/null
	if [ $? -ne 0 ]; then
		exit 1
	fi
	docker container exec -ti $CONTAINER /bin/ash
fi

RESTARTING=$(docker container inspect --format "{{.State.Restarting}}" $CONTAINER 2>/dev/null )


#verify the container is restarting
if [ $RESTARTING == "true" ]; then
	echo "WARNING - The container is restarting..."
	exit 1
fi
