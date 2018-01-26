const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = function(env = {}) {
  if (env.production) {
    process.env.NODE_ENV = 'production';
  }

  function makeStyleLoader(type) {
    const cssLoader = {
      loader: 'css-loader',
      options: {
        minimize: env.production
      }
    };
    const loaders = [cssLoader];
    if (type) {
      loaders.push(type + '-loader');
    }
    if (env.production) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      });
    } else {
      return ['vue-style-loader'].concat(loaders);
    }
  }

  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, '../public/assets'),
      publicPath: 'http://localhost:8080/',
      filename: env.production ? 'js/main.min.js?[chunkhash]' : 'js/main.js'
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
            name: 'images/[name].[ext]?[hash]'
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
        filename: 'css/style.min.css?[contenthash]'
      }),
      new AssetsPlugin({
        filename: 'assets.json',
        path: path.resolve(__dirname, '../public/assets'),
        fullPath: false
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
