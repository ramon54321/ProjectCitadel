### Password File
There is a password file `.pgpass` located in the home directory of the development machine, taking the following form.
```
<host>:<port>:<database>:<username>:<password>
```
The file has permissions `600`.

### Running Script
A script can be run by running the `run.sh` script followed by the script name in the `scripts` folder. The `run.sh` script is called with `npm run database`.