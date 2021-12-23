
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const { merge } = require('webpack-merge');
const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const prodConfig = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        filename: '[name].[contenthash:8].js',
        path: resolveApp('dist')
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    plugins: [ new ModuleFederationPlugin(
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
