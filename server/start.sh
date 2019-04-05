#!/bin/bash

#
# This file is run by systemd on service start. (After a deploy)
#

# Install Dependencies
npm install --production

# Run Dist
RUN_ENV=production node dist/server.js