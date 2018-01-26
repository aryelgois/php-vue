const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env = {}) {
  if (env.production) {
    process.env.NODE_ENV = 'production';
  }

  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, '../public/assets'),
      publicPath: 'http://localhost:8080/',
      filename: env.production ? 'js/main.min.js' : 'js/main.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: makeStyleLoader(),
              less: makeStyleLoader('less')
            }
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: makeStyleLoader()
        },
        {
          test: /\.less$/,
          use: makeStyleLoader('less')
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      ]
    },
    plugins: env.production ? [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin({
        filename: 'css/style.min.css'
      })
    ] : [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: false,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
    devtool: env.production ? false : '#cheap-module-eval-source-map'
  };
};
