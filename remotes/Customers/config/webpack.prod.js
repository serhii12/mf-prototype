const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const { merge } = require('webpack-merge');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: './'
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
    ),new HtmlWebpackPlugin({ template: './public/index.html' })],
}; module.exports = merge(commonConfig, prodConfig);
