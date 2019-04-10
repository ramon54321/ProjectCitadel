#!/bin/bash

#
# This script is run locally to deploy dist folder to remote.
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
ssh 35.228.19.40 'rm -rf /var/www/citadel/client/*'

# Copy dist folder
scp -r ./dist 35.228.19.40:/var/www/citadel/client/dist

# Restart Service
ssh 35.228.19.40 'sudo systemctl restart citadel' 