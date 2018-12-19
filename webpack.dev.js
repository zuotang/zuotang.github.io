const path = require('path');
const webpack = require('webpack');
const configBase = require('./webpack.base.js');
const merge = require('webpack-merge');
//html生成
const HTMLWebpackPlugin = require('html-webpack-plugin');

const webConfig=require('./config.json');
const {basename,title}=webConfig;
//获取本机ip
function getIPAdress() {
  //return '192.168.56.1'
  const interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

const config = {
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader', {loader: 'less-loader'}],
      },
    ],
  },
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    host: getIPAdress(),
    contentBase: path.join(__dirname, './'),
    inline: true,
    hot: true,
    open: true,
    port: 3093,
    historyApiFallback: true,
    watchOptions: {
      //监听配置变化
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热加载
    new HTMLWebpackPlugin({
      title: title,
      inject: true,
      filename: 'index.html',
      template: path.join(__dirname, './src/index.ejs'),
    }),
  ],
 
};

module.exports = merge(configBase, config);
