const path = require('path')

const config = {
  entry: {
    app: './src/scripts/app/app.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: '[name].citadel.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map'
  }
  return config
}
