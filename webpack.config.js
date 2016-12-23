var webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: ['node_modules', 'dist'],
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  output: {
    path: './dist',
    publicPath: '/assets/',
    filename: 'app.min.js'
  }
}
