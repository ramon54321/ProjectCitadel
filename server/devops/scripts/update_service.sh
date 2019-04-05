#!/bin/bash

# Break on Error
set -e

# Copy Service
scp ./devops/citadel.service 35.228.19.40:/home/ramon54321/citadel.service
ssh 35.228.19.40 << EOF

# Move Service 
sudo mv /home/ramon54321/citadel.service /etc/systemd/system/citadel.service

# Reload Daemon
sudo systemctl daemon-reload

EOF