// @ts-nocheck
const { merge } = require('webpack-merge');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const fs = require("fs");
const path = require("path");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const devConfig = {
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    compress: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  devtool: 'cheap-module-source-map',
  output: {
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new ESLintPlugin({
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      failOnError: true
    }),
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        'customers': 'customers@http://localhost:3100/remoteEntry.js',
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
  ],
};

module.exports = merge(commonConfig, devConfig);
