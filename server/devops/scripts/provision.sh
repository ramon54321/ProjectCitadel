#!/bin/bash

#
# Run locally and provisions remote.
#

# Break on Error
set -e

ssh 35.228.19.40 << EOF

# Break on Error
set -e

# Download nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

# Source nvm
source ~/.nvm/nvm.sh

# Install Node
nvm install 10.15.3

# Install NGINX
sudo apt install nginx -y

# Install Commons
sudo apt-get install software-properties-common -y

# Install Netcat
sudo apt install netcat -y

# Install Certbot
sudo add-apt-repository ppa:certbot/certbot -y
sudo apt install certbot -y

# Create folders
sudo mkdir /var/www/citadel

sudo chown ramon54321:ramon54321 /var/www/citadel

mkdir /var/www/citadel/client
mkdir /var/www/citadel/server

# Install Postgres
sudo sh -c "echo 'deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main' >> /etc/apt/sources.list.d/pgdg.list"
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install postgresql-10 -y

# Enable Listening Postgres
sudo sed -i "s/.*listen_addresses.*/listen_addresses = '*'/" /etc/postgresql/10/main/postgresql.conf

echo 'host all all 0.0.0.0/0 md5' | sudo tee --append /etc/postgresql/10/main/pg_hba.conf
echo 'host all all ::/0 md5' | sudo tee --append /etc/postgresql/10/main/pg_hba.conf

# Restart Postgres
sudo systemctl restart postgresql

EOF

# Create Certificates
./devops/scripts/create_certificates.sh

# Copy NGINX Config
./devops/scripts/update_nginx_config.sh