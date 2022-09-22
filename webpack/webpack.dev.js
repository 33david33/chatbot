const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    publicPath: '/frontend',
    path: path.resolve(__dirname, '..', './dist/frontend'),
    filename: '[name].[contenthash].js',
  },
  entry: {
    bundle: [
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      './src/frontend',
    ],
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    watchContentBase: true,
    contentBase: 'dist',
    hotOnly: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.SERVER_URL': JSON.stringify('http://localhost:4200'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/frontend/public/assets/locales',
          to: 'public/assets/locales',
        },
      ],
    }),
  ],
};
