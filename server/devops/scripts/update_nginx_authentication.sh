#!/bin/bash

# Break on Error
set -e

# Copy NGINX Config
scp ./devops/.htpasswd 35.228.19.40:/home/ramon54321/.htpasswd
ssh 35.228.19.40 << EOF

# Move NGINX conf
sudo mv /home/ramon54321/.htpasswd /etc/nginx/.htpasswd

# Reload / Restart Nginx
sudo systemctl reload-or-restart nginx

EOF