/**
 * Webpack common Configuration
 * studio90srls project
 * Version: 3.0.0
 */

const fs = require('fs');
const ssl = require('./ssl.location');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common,{
  devtool: 'cheap-module-eval-source-map',
  output : {
    path : path.resolve(__dirname,'../../dist'),
    publicPath : '/',
    filename: '[name].js',
    chunkFilename : '[id].chunk.js'
  },

  devServer: {
    https: {
      cert : fs.readFileSync(ssl.cert),
      key  : fs.readFileSync(ssl.key)
    },
    hot: true,
    historyApiFallback: true,
    stats: 'minimal'
  },

  module: {
    rules :[
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
