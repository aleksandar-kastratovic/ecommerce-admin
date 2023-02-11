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

PROJECT='${BITBUCKET_DEPLOYMENT_ENVIRONMENT}'
            BITBUCKET_BRANCH_1='${BITBUCKET_BRANCH}'
            BITBUCKET_REPO_SLUG_1='${BITBUCKET_REPO_SLUG}'
            BITBUCKET_EXIT_CODE_1='${BITBUCKET_EXIT_CODE}'
            TEMP_STATUS='Pocelo'


curl -X POST https://roverkonfigurator.croonus.com/backend/save.php?test=${PROJECT}
   -H "Content-Type: application/json"
   -d "{\"PROJECT\":\"${PROJECT}\",\"BITBUCKET_BRANCH_1\":\"${BITBUCKET_BRANCH_1}\",\"BITBUCKET_REPO_SLUG_1\":\"${BITBUCKET_REPO_SLUG_1}\",\"BITBUCKET_EXIT_CODE_1\":\"${BITBUCKET_EXIT_CODE_1}\",\"TEMP_STATUS\":\"${TEMP_STATUS}\"}"
