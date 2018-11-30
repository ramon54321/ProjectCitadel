#!/bin/bash

#
# This script is run locally to deploy dist folder to remote.
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
ssh 35.228.184.142 'rm -rf /var/www/citadel/client/*'

# Copy dist folder
scp -r ./dist 35.228.184.142:/var/www/citadel/client/dist

# Restart Service
ssh 35.228.184.142 'sudo systemctl restart citadel' 