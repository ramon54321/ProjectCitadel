#!/bin/bash

#
# This script is run locally to deploy dist folder, start.sh and package.json to remote.
#

# Break on Error
set -e

# Clean local dist
npm run clean

# Build local production
npm run compile:production

# Stop Service
ssh 35.228.19.40 'sudo systemctl stop citadel' 

# Remove remote folder
ssh 35.228.19.40 'rm -rf /var/www/citadel/server/*'

# Copy package.json
scp ./package.json 35.228.19.40:/var/www/citadel/server/package.json

# Copy package-lock.json
scp ./package-lock.json 35.228.19.40:/var/www/citadel/server/package-lock.json

# Copy .env
scp ./.env 35.228.19.40:/var/www/citadel/server/.env

# Copy start.sh
scp ./start.sh 35.228.19.40:/var/www/citadel/server/start.sh

# Copy dist folder
scp -r ./dist 35.228.19.40:/var/www/citadel/server/dist

# Set Execution Permission
ssh 35.228.19.40 'sudo chmod +x -R /var/www/citadel/server'

# Restart Service
ssh 35.228.19.40 'sudo systemctl restart citadel' 