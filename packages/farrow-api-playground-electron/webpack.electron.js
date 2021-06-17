const path = require('path')

const electronConfiguration = {
  mode: 'development',
  entry: './electron/main.ts',
  target: 'electron-main',
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'electron'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        include: /electron/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },
  plugins: [],
}

module.exports = electronConfiguration
