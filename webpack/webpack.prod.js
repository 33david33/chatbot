const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const zlib = require('zlib');
const CompressionPlugin = require('compression-webpack-plugin');

const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '..', './dist/frontend'),
    filename: '[name].[contenthash].js',
  },
  entry: {
    bundle: ['./src/frontend'],
  },
  mode: 'production',
  optimization: {
    usedExports: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          parse: { ecma: 8 },
          compress: {
            passes: 3,
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
          keep_classnames: true,
          keep_fnames: true,
          safari10: true,
        },
      }),
    ],

    splitChunks: {
      cacheGroups: {
        js: {
          test: /\.js$/,
          name: 'commons',
          chunks: 'all',
          minChunks: 7,
        },
        css: {
          test: /\.(css|less|sass|scss)$/,
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SERVER_URL': JSON.stringify('http://localhost:4200'),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/frontend/public/assets/locales',
          to: 'public/assets/locales',
        },
      ],
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // }),
  ],
};
