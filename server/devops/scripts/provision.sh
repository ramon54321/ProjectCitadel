#!/bin/bash

#
# Run locally and provisions remote.
#

ssh 35.228.184.142 << EOF

# Download nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

# Source nvm
source ~/.nvm/nvm.sh

# Install Node
nvm install 11.1.0

# Install Yarn
npm install -g yarn

# Install NGINX
sudo apt install nginx -y

# Create folders
sudo mkdir /var/www/citadel

sudo chown ramon54321:ramon54321 /var/www/citadel

mkdir /var/www/citadel/client
mkdir /var/www/citadel/server

EOF

# Copy NGINX Config
./devops/update_nginx_config.sh