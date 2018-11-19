#!/bin/bash

# Break on Error
set -e

# Copy Syslog Config
scp ./devops/25-citadel.conf 35.228.184.142:/home/ramon54321/25-citadel.conf
ssh 35.228.184.142 << EOF

# Move Syslog Config
sudo mv /home/ramon54321/25-citadel.conf /etc/rsyslog.d/25-citadel.conf

# Reload Syslog
sudo systemctl restart rsyslog

EOF