const path = require('path');
const nodeExternals = require('webpack-node-externals');

const prod = 'production';
const dev = 'development';
const mode = process.env.NODE_ENV === prod ? prod : dev;

module.exports = {
  mode: mode,
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  target: 'node',
  watch: mode === dev,

  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },

  node: {
    fs: "empty"
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      $src: path.resolve(__dirname, '/src')
    }
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '/dist')
  },
};
