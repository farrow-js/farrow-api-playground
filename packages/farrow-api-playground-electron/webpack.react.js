const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const reactConfiguration = {
  mode: 'development',
  entry: './src/renderer.tsx',
  target: 'electron-renderer',
  devtool: 'source-map',
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    path: __dirname + '/dist',
    filename: 'renderer.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      publicPath: './dist',
    }),
  ],
}

module.exports = reactConfiguration
