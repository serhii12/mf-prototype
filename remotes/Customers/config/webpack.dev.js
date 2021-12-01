
// @ts-nocheck
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const { MFLiveReloadPlugin } = require("@module-federation/fmr");

const devConfig = {
    mode: 'development',
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
        port: 3100,
            historyApiFallback: {
              index: 'index.html',
            },
    },
     output: {
        publicPath: 'http://localhost:3100/'
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    plugins: [    new MFLiveReloadPlugin({
      port: 3000,
      container: 'container'
    }),new ModuleFederationPlugin(
        {
            name: 'customers',
            filename:
                'remoteEntry.js',
            exposes: {
                './CustomersApp': './src/bootstrap'
            },
            shared: packageJson.dependencies,
        }
    ),    new HtmlWebpackPlugin({
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
     new ESLintPlugin({
      files: ['src/**/*.ts', 'src/**/*.tsx'],
    })
]}; module.exports = merge(commonConfig, devConfig);
