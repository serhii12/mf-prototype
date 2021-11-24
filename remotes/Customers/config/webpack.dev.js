const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

const devConfig = {
    mode: 'development',
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
       open: true,
        port: 3200,
            historyApiFallback: {
              index: 'index.html',
            },
    },
     output: {
        publicPath: 'http://localhost:3200/'
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    plugins: [    new ModuleFederationPlugin(
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
    new ESLintPlugin()]
}; module.exports = merge(commonConfig, devConfig);
