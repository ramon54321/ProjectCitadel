#!/bin/bash

# Copy Service
scp ./devops/citadel.service 35.228.184.142:/home/ramon54321/citadel.service
ssh 35.228.184.142 << EOF

# Move Service 
sudo mv /home/ramon54321/citadel.service /etc/systemd/system/citadel.service

# Reload Daemon
sudo systemctl daemon-reload

EOF