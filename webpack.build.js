const configBase = require('./webpack.base.js');
const merge = require('webpack-merge');

const path = require('path');
const webpack = require('webpack');

//const autoprefixer = require('autoprefixer');
//按需加载
const {ReactLoadablePlugin} = require('react-loadable/webpack');
//复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
//删除打包文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
//压缩js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//文件大小查看 性能优化
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//拆分css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//把manifest打包到html
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

//html生成
const HTMLWebpackPlugin = require('html-webpack-plugin');

const webConfig=require('./config.json');
const {basename,title}=webConfig;
const config = {
  output: {
    path: path.resolve(__dirname,'build'),
    publicPath: `${basename}/build`,
    filename: `[name].js`,
    chunkFilename: `[name].js`,
  },
  optimization: {
    nodeEnv: 'production',
    namedChunks: true,
    runtimeChunk: 'single',
    splitChunks: {
      minChunks: Infinity,
      cacheGroups: {
        default: false,
        vendors: false,
        // vendor chunk
        // vendor chunk
        vendor: {
          // name of the chunk
          name: 'vendor',
          // async + async chunks
          chunks: 'all',
          // import file path containing node_modules
          test: /node_modules/,
          // priority
          priority: 20,
        },
        // common chunk
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {url: true},
          },
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
            },
          },
        ],
      },
    ],
  },
  mode: 'production',
  plugins: [
    new HTMLWebpackPlugin({
      title: title,
      inject: true,
      filename: '../index.html',
      template: path.join(__dirname, './src/index.ejs'),
    }),
    new MiniCssExtractPlugin({
      filename: `[name].css`,
      chunkFilename: `[name].css`,
    }),
    
    new CleanWebpackPlugin(['./build']), //删除打包文件
    new InlineManifestWebpackPlugin(),
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json',
    }),
    
    new BundleAnalyzerPlugin(),
  ],
};

module.exports = merge(configBase, config);
