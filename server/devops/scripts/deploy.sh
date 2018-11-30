#!/bin/bash

#
# This script is run locally to deploy dist folder, start.sh and package.json to remote.
#

# Break on Error
set -e

# Clean local dist
yarn run clean

# Build local production
yarn run production:compile

# Stop Service
ssh 35.228.184.142 'sudo systemctl stop citadel' 

# Remove remote folder
ssh 35.228.184.142 'rm -rf /var/www/citadel/server/*'

# Copy package.json
scp ./package.json 35.228.184.142:/var/www/citadel/server/package.json

# Copy yarn.lock
scp ./yarn.lock 35.228.184.142:/var/www/citadel/server/yarn.lock

# Copy .env
scp ./.env 35.228.184.142:/var/www/citadel/server/.env

# Copy start.sh
scp ./start.sh 35.228.184.142:/var/www/citadel/server/start.sh

# Copy dist folder
scp -r ./dist 35.228.184.142:/var/www/citadel/server/dist

# Set Execution Permission
ssh 35.228.184.142 'sudo chmod +x /var/www/citadel/server/start.sh'

# Restart Service
ssh 35.228.184.142 'sudo systemctl restart citadel' 