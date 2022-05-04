#!/bin/bash
########################################################################################################################
#                                                        Readme                                                        #
#                                                                                                                      #
# Available env variables                                                                                              #
#     EC_DEV - If true the container will read the files from the current working directory (default: false)           #
#     EC_SKIP_PULL - If true the latest image will not be pulled (default: false)                                      #
#     EC_PORT - The port to run the app on (default: 80)                                                               #
#                                                                                                                      #
#     EC_DOCKER_USERNAME - The optional login to use before pulling the Docker image                                   #
#     EC_DOCKER_PASSWORD - The optional password to use before pulling the Docker image                                #
#                                                                                                                      #
#                                                                                                                      #
########################################################################################################################

# Exit on any command failure
set -eu
stput() { [ ${TERM:-dumb} != dumb ] && tput $@ || true; }
trap 'LAST_COMMAND=${CURRENT_COMMAND=}; CURRENT_COMMAND=$BASH_COMMAND' DEBUG
trap 'ERROR_CODE=$?; FAILED_COMMAND=$LAST_COMMAND; stput setaf 9; echo; echo "***"; echo "ERROR: command \"$FAILED_COMMAND\" failed with exit code $ERROR_CODE"; echo "***"; echo; stput sgr0;' ERR INT TERM

# Validate that the docker is installed
if [ ! $(which docker) ]; then
    echo "ERROR: This system does not have docker installed"
    exit 10
fi
echo "### Run initiated"

# The docker container registry and image name
REGISTRY=65479696
IMAGE_NAME=ecommerce-admin

# Define all composite variables that are used multiple times
REPO=$REGISTRY/$IMAGE_NAME
SOURCE=$REPO:${IMAGE_TAG:-latest}

# Pull the image
if [ ! ${EC_SKIP_PULL:-} ]; then

    # Log into
    if [ ${EC_DOCKER_USERNAME:-} ]; then
        echo "### Logging into docker as $EC_DOCKER_USERNAME" &>/dev/null
        docker login -u "$EC_DOCKER_USERNAME" -p "$EC_DOCKER_PASSWORD"
    fi

    echo "### Pulling image: '$SOURCE'"
    docker pull $SOURCE
fi

# Kill the previous running container with the same image name
ACTIVE_CONTAINER=$(docker ps -aqf "name=$IMAGE_NAME")
if [[ ! -z $ACTIVE_CONTAINER ]]; then
    echo "### Removing existing: '$IMAGE_NAME' ($ACTIVE_CONTAINER)"
    docker stop $ACTIVE_CONTAINER &>/dev/null
    docker rm $ACTIVE_CONTAINER &>/dev/null
fi

# Run the new updated image
echo "### Staring '$IMAGE_NAME' from '$REPO'"
HASH=$(docker run -d \
    -p ${EC_PORT:-80}:80 \
    --restart unless-stopped \
    --name $IMAGE_NAME \
    $REPO)

# Done
echo "### Docker container started: '$HASH'"
stput setaf 2 && echo && echo -n "### DONE${LOCAL_VOLUME:+" - RUNNING IN DEVELOPMENT MODE"} ###" && echo && stput sgr0
