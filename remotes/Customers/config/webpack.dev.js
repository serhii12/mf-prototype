
// @ts-nocheck
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const resolve = require('resolve');
const packageJson = require('../package.json');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const { MFLiveReloadPlugin } = require("@module-federation/fmr");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const fs = require("fs");
const path = require("path");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const devConfig = {
    mode: 'development',
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
        port: 3100,
            historyApiFallback: true
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
    }),
        new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        typescriptPath: resolve.sync('typescript', {
          basedir: resolveApp('node_modules')
        }),
        configOverwrite: {
          compilerOptions: {
            sourceMap: true,
            skipLibCheck: true,
            inlineSourceMap: false,
            declarationMap: false,
            noEmit: true,
            incremental: true,
            tsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo')
          },
        },
        context: resolveApp('.'),
        diagnosticOptions: {
          syntactic: true,
        },
        mode: 'write-references',
        // profile: true,
      },
      issue: {
        // This one is specifically to match during CI tests,
        // as micromatch doesn't match
        // '../cra-template-typescript/template/src/App.tsx'
        // otherwise.
        include: [
          { file: '../**/src/**/*.{ts,tsx}' },
          { file: '**/src/**/*.{ts,tsx}' },
        ],
        exclude: [
          { file: '**/src/**/__tests__/**' },
          { file: '**/src/**/?(*.){spec|test}.*' },
          { file: '**/src/setupProxy.*' },
          { file: '**/src/setupTests.*' },
        ],
      },
      logger: {
        infrastructure: 'silent',
      },
    }),
]}; module.exports = merge(commonConfig, devConfig);
