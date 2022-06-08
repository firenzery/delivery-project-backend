@echo off

set CONTAINER=firenzery

::verify if Docker is installed
::IF START CONDITION 
	echo "Docker is missing, please install it in order to continue..."
	exit 1
::IF END

::verify it's talking to Daemon
docker -v >nul
::IF START CONDITION
	echo "Cannot talk to the Docker Daemon."
        exit 1
::IF END

set RUNNING=::see how to use a command return


