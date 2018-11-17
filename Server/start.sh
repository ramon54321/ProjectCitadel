#!/bin/bash

#
# This file is run by systemd on service start. (After a deploy)
#

# Set PATH
PATH=/home/ramon54321/.nvm/versions/node/v11.1.0/bin/:$PATH

# Install Dependencies
yarn install

# Run Dist
yarn serve:production