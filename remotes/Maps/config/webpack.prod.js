const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const { merge } = require('webpack-merge');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: './'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'maps',
            filename: 'remoteEntry.js',
            exposes: {
                './MapsApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ]
}

module.exports = merge(commonConfig, prodConfig);