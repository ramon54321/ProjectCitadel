### Server
This `server` folder contains all the needed code to build and manage the server application and machine.

### Deployment
Only the `dist` folder, `package.json` and `start.sh` files are copied to the production machine on deploy, meaning the application has to be built locally first, which will happen automatically when calling `yarn devops:deploy`. This will cause a production config build, and deploy the files to the production machine, and restart the `citadel` service. There will be a few seconds downtime during the restart.

TODO: Run `yarn install` after deploy but before service restart. This should cause the restart to be much quicker.