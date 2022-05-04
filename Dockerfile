########################################################################################################################
#                                                                                                                      #
#                                                                                                                      #
# Mandatory build parameters                                                                                           #
#     EC_API_URL - The absolute URL to the base location of the API                                                       #
#                                                                                                                      #
#                                                                                                                      #
########################################################################################################################

# Build the react app for the production
FROM node:14-alpine as build
LABEL org.label-schema.schema-version="1.0.0" \
      org.label-schema.vendor="Croonus" \
      org.label-schema.name="croonus.ecommerce-admin"

# Handle the buidl parameters
ARG EC_API_URL

# Build the application
WORKDIR /app
COPY . /app
RUN echo "Config:" && \
	echo "    EC_API_URL: ${EC_API_URL:?Please provide EC_API_URL as a build argument}" && \
    \
    echo "REACT_APP_URL=$EC_API_URL" > /app/.env.production && \
    echo "NODE_ENV=production" >> /app/.env.production && \
    echo "Environment:" && cat /app/.env.production && \
    \
	npm install --quiet > /dev/null && \
	npm run build

# Serve the build folder via nginx
FROM nginx:1.17.8-alpine as nginx

# Copy all files
COPY deploy/docker /
COPY --from=build /app/build /var/www

# Run
EXPOSE 80
ENTRYPOINT nginx -g 'daemon off;'
