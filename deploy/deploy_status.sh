#!/bin/bash
########################################################################################################################
#                                                        README                                                        #
#                                                                                                                      #
# Available env variables:                                                                                             #
#     PROJECT - The name of the project to use as a prefix                                                             #
#     PORT - The port to run the app on (default: 6001)                                                                #
#     SKIP_PULL - If true the latest image will not be pulled (default: false)                                         #
#                                                                                                                      #
#     DOCKER_ACCOUNT - The account to use when connecting to the Docker repository                                     #
#     DOCKER_IMAGE - The name of the docker image to pull                                                              #
#     DOCKER_PASSWORD - The optional password to use before pulling the Docker image                                   #
#                                                                                                                      #
#                                                                                                                      #
########################################################################################################################

echo "First arg: $1"
echo "Second arg: $2"


curl -X POST "https://roverkonfigurator.croonus.com/backend/save.php?ENVIRONMENT=$1&EXIT_CODE=$2"
   -H "Content-Type: application/json"
   -d "{\"BITBUCKET_EXIT_CODE\":\"$1\",\"BITBUCKET_EXIT_CODE\":\"$2\"}"
