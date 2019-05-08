var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true
  },
  entry: {
    mainBundle: [
      'babel-polyfill',
      './src/main.js'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin() // don't send node modules with compilation errors
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader'
      }
    ]
  }
 }
