#!/bin/bash

#
# This script is run locally to deploy dist folder, start.sh and package.json to remote.
#

# Clean local dist
yarn run clean

# Build local production
yarn run production:compile

# Remove remote folder
ssh 35.228.184.142 'rm -rf /var/www/citadel/server/*'

# Copy package.json
scp ./package.json 35.228.184.142:/var/www/citadel/server/package.json

# Copy start.sh
scp ./start.sh 35.228.184.142:/var/www/citadel/server/start.sh

# Set Execution Permission
ssh 35.228.184.142 'sudo chmod +x /var/www/citadel/server/start.sh'

# Copy dist folder
scp -r ./dist 35.228.184.142:/var/www/citadel/server/dist

# Restart Service
ssh -tt 35.228.184.142 'sudo systemctl restart citadel' 