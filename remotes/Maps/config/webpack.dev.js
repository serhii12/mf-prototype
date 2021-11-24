const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const ESLintPlugin = require('eslint-webpack-plugin');

const devConfig = {
  mode: 'development',
  devServer: {
    open: true,
    port: 3100,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  output: {
    publicPath: 'http://localhost:3100/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'maps',
      filename: 'remoteEntry.js',
      exposes: {
        './MapsApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new ESLintPlugin(),
  ],
};

module.exports = merge(commonConfig, devConfig);
