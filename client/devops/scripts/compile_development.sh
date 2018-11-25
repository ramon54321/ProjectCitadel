
set -e

# Lint
yarn run lint

# Compile with Development config
webpack --mode development

# Copy Html files
cp src/html/app.html dist/app.html