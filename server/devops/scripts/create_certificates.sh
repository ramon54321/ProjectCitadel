#!/bin/bash

#
# Run locally and generates certificate for remote.
#

# Break on Error
set -e

ssh 35.228.184.142 << EOF

# Stop NGINX
sudo systemctl stop nginx

# Create Certificate
sudo certbot certonly --standalone -n --agree-tos --register-unsafely-without-email --preferred-challenges http -d dev.citadel.ramonbrand.ml

sudo ln -s /etc/letsencrypt/live/dev.citadel.ramonbrand.ml/fullchain.pem /etc/nginx/fullchain.pem
sudo ln -s /etc/letsencrypt/live/dev.citadel.ramonbrand.ml/privkey.pem /etc/nginx/privkey.pem

# Start NGINX
sudo systemctl restart nginx

EOF
