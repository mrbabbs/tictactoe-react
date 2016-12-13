var webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  module: {
    loader: {
      test: /\.js$/,
      exclude: ['node_modules', 'dist'],
      loader: 'babel-loader'
    }
  },
  output: {
    path: './dist',
    filename: 'app.min.js'
  }
}
