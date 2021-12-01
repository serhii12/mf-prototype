// @ts-nocheck
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const ESLintPlugin = require('eslint-webpack-plugin');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  output: {
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new ESLintPlugin({
      files: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        'customers': 'customers@http://localhost:3100/remoteEntry.js'
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
    })
  ],
};

module.exports = merge(commonConfig, devConfig);
