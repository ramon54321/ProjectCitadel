
set -e

# Lint
yarn run lint

# Compile with Production config
webpack --mode production

# Copy Html files
cp src/html/app.html dist/app.html