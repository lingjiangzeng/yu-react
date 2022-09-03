const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
const webpackbar = require('webpackbar');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const production = {
  entry: './src/index.js',
  output: {
    filename: 'static/js/index.[fullhash:20].js',
    chunkFilename: 'static/js/[name].[fullhash:20].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp|eot|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[chunkhash:7].[ext]',
          publicPath: '../static/images',
          outputPath: "static/images",
          esModule: false
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[chunkhash:7].[ext]',
          publicPath: '../static/font',
          outputPath: "static/font",
          esModule: false
        },
      },
      {
        test: /\.(mp4|WMV)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[chunkhash:7].[ext]',
          publicPath: '../static/video',
          outputPath: "static/video",
          esModule: false
        },
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpackbar(),
    new webpack.DefinePlugin({
      'project_env': '"production"'
    }),
    new htmlwebpackplugin({
      filename: './index.html',
      template: './index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./static/fonticon/iconfont.css", to: "static/font/iconfont.css" },
        { from: "./static/fonticon/iconfont.ttf", to: "static/font/iconfont.ttf" },
      ]
    }),
  ],
  mode: 'production',
  stats: "errors-only",
  devtool: "nosources-source-map"
}

module.exports = production;