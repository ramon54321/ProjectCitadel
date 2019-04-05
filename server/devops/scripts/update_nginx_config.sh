#!/bin/bash

# Break on Error
set -e

# Copy NGINX Config
scp ./devops/nginx.conf 35.228.19.40:/home/ramon54321/nginx.conf
ssh 35.228.19.40 << EOF

# Move NGINX conf
sudo mv /home/ramon54321/nginx.conf /etc/nginx/nginx.conf

# Reload / Restart Nginx
sudo systemctl reload-or-restart nginx

EOF