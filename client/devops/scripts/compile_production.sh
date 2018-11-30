
set -e

# Lint
yarn run lint

# Clean
yarn run clean

# Compile with Production config
webpack --mode production

# Copy specific files
cp src/app.html dist/app.html
cp src/manifest.json dist/static/manifest.json
cp src/favicon.ico dist/favicon.ico
cp src/serviceworker.js dist/serviceworker.js

# Copy static files
cp src/static/* dist/static/
# cp src/html/* dist/static/
cp src/scss/* dist/static/
