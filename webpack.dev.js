const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader'
        ],
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true
  },
  mode: 'development',
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].[chunkhash:8].css',
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
