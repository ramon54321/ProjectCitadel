
set -e

# Lint
yarn run lint

# Clean
yarn run clean

# Compile with Development config
webpack --mode development

# Copy specific files
cp src/app.html dist/app.html
cp src/manifest.json dist/static/manifest.json
cp src/serviceworker.js dist/serviceworker.js

# Copy static files
# cp src/html/* dist/static/
cp src/scss/* dist/static/
