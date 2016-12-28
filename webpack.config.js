var webpack = require('webpack');

module.exports = {
  entry: './src/app/app.jsx',
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
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
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: './.eslintrc'
  }
}
