/**
 * Webpack common Configuration
 * studio90srls project
 * Version: 3.0.0
 */
const path = require('path');
const webpack = require('webpack');
const plugins = {
  Html: require('html-webpack-plugin'),
  Extract: require('extract-text-webpack-plugin')
};

module.exports = {
  entry: {
    app: './src/main.ts',
    vendor: './src/vendor.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
        test: /\.ts$/,
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.resolve(__dirname, '../../tsconfig.json')
          }
        }]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      },
      {
        test: /\.css$/,
        use: plugins.Extract.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }]
        })
      },
      {
        test: /\.(svg|png|gif|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[hash].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
        }
      }
    ]
  },
  plugins: [
    new plugins.Html({
      template: './src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    }),
    new webpack.ProgressPlugin()
  ]
};
