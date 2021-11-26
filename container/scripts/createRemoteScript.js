const fs = require('fs-extra');
const path = require('path');
const rootDir = path.resolve('../');
const variables = {
  remote_name: process.env.npm_config_remote_name,
  on_port: process.env.npm_config_on_port,
};

console.log(variables);

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  white: '\x1b[37m',
};

const paintIn = function (text, color) {
  if (!colors[color]) color = colors['white'];

  return `${color}${text}${color}`;
};

const capitalize = function (str) {
  return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
};

process.argv.forEach((arg) => {
  const keyValuePairs = arg.split('=');

  if (keyValuePairs.length > 1) {
    variables[keyValuePairs[0]] = keyValuePairs[1];
  }
});

if (!variables['on_port']) {
  throw new Error(
    'Port is missing, add on_port argument, make sure to -- before it, like -- on_port={PORT}'
  );
  process.exit(1);
}

if (!variables['remote_name']) {
  throw new Error(
    'Remote name is missing, add remote_name argument, make sure to -- before it, like -- remote_name={NAME}'
  );
  process.exit(1);
}

if (
  !fs.existsSync(`${rootDir}/remotes/${variables['remote_name']}`) &&
  !fs.existsSync(`${rootDir}/remotes/${capitalize(variables['remote_name'])}`)
) {
  fs.mkdirSync(`${rootDir}/remotes/${capitalize(variables['remote_name'])}`);
  fs.copy(
    `${rootDir}/container/scripts/remoteAppSample`,
    `${rootDir}/remotes/${capitalize(variables['remote_name'])}`
  );
  fs.removeSync(`${rootDir}/remotes/${capitalize(variables['remote_name'])}/config/webpack.dev.js`);

  fs.outputFile(
    `${rootDir}/remotes/${capitalize(variables['remote_name'])}/config/webpack.dev.js`,
    `const path = require('path')
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
       open: true,
        port: ${variables['on_port']},
            historyApiFallback: {
              index: 'index.html',
            },
    },
     output: {
        publicPath: 'http://localhost:${variables['on_port']}/'
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    plugins: [    new MFLiveReloadPlugin({
      port: 3000,
      container: 'container'
    }),new ModuleFederationPlugin(
        {
            name: '${variables['remote_name'].toLowerCase()}',
            filename:
                'remoteEntry.js',
            exposes: {
                './${capitalize(variables['remote_name'])}App': './src/bootstrap'
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
`,
    function (err) {
      if (err) {
        throw new Error(err);
      }
    }
  );

  fs.outputFile(
    `${rootDir}/remotes/${capitalize(variables['remote_name'])}/config/webpack.prod.js`,
    `const path = require('path')
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
    plugins: [ new ModuleFederationPlugin(
        {
            name: '${variables['remote_name'].toLowerCase()}',
            filename:
                'remoteEntry.js',
            exposes: {
                './${capitalize(variables['remote_name'])}App': './src/bootstrap'
            },
            shared: packageJson.dependencies,
        }
    ),new HtmlWebpackPlugin({ template: './public/index.html' })],
}; module.exports = merge(commonConfig, prodConfig);
`,
    function (err) {
      if (err) {
        throw new Error(err);
      } else {
        console.info(`\x1b[32mJob succeeded.`);
        console.log('');
        console.log('\x1b[31mIMPORTANT:\x1b[0m');
        console.log('There are few more steps to do:');
        console.log(
          ` 1. Please add the line bellow to ModuleFederation remotes in ${rootDir}/container/config/webpack.dev.js`
        );
        console.log(
          ` \x1b[33m "${variables['remote_name'].toLowerCase()}": "${variables[
            'remote_name'
          ].toLowerCase()}@http://localhost:${variables['on_port']}/remoteEntry.js"\x1b[0m`
        );
        console.log(
          ` 2. Switch to ${rootDir}/remotes/${capitalize(
            variables['remote_name']
          )} and run npm install.`
        );
        console.log(
          ` 3. All neccessary files are already created, but cant really format prettier in them, just go to ${rootDir}/container/src/remotes/${variables['remote_name']}Remote .jsx and .js and trigger prettier`
        );
        console.log(' ');
        console.log(`And thats it, you can now import the component anywhere using:`);
        console.log(
          ` \x1b[33m import ${capitalize(
            variables['remote_name']
          )}Remote from @core/remotes/${capitalize(variables['remote_name'])}Remote\x1b[0m`
        );
        console.log(' ');
      }
    }
  );

  if (
    !fs.existsSync(`${rootDir}/container/src/remotes/${capitalize(variables['remote_name'])}Remote`)
  ) {
    fs.mkdirSync(`${rootDir}/container/src/remotes/${capitalize(variables['remote_name'])}Remote`);

    fs.outputFile(
      `${rootDir}/container/src/remotes/${capitalize(variables['remote_name'])}Remote/${capitalize(
        variables['remote_name']
      )}Remote.jsx`,
      `import React, { useRef, useEffect } from 'react';
        export default () => {
          const ref = useRef(null);

          useEffect(() => {
            import('${variables['remote_name'].toLowerCase()}/${capitalize(
        variables['remote_name']
      )}App')
              .then(({ mount }) => mount(ref.current))
              .catch(() => {
                throw new Error('${capitalize(variables['remote_name'])} remote failed to load!');
              });
          }, []);

          return <div ref={ref} />;
        };
`,
      function (err) {
        if (err) {
          throw new Error(err);
        }
      }
    );

    fs.outputFile(
      `${rootDir}/container/src/remotes/${capitalize(variables['remote_name'])}Remote/index.js`,
      `import ${capitalize(variables['remote_name'])}Remote from './${capitalize(
        variables['remote_name']
      )}Remote';

       export default ${capitalize(variables['remote_name'])}Remote;`,
      function (err) {
        if (err) {
          throw new Error(err);
        }
      }
    );
  }

  const packageJSON = fs.readJsonSync('./package.json');

  if (packageJSON) {
    fs.writeJsonSync(
      './package.json',
      Object.assign(packageJSON, {
        scripts: {
          ...packageJSON.scripts,
          [`remotes:${variables['remote_name'].toLowerCase()}`]: `concurrently -n "${variables[
            'remote_name'
          ].toLowerCase()},container"  -c "bgBlue.bold,bgMagenta.bold,bgGreen.bold" "cd ../remotes/${capitalize(
            variables['remote_name']
          )} && npm run start" "npm run start"`,
        },
      })
    );
  }
} else {
  throw new Error(`Directory with name ${variables['remote_name']} already exists.`);
}
