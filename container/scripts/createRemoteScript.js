// @ts-nocheck
const fs = require('fs-extra');
const path = require('path');
const rootDir = path.resolve('../');
const variables = {
  remote_name: process.env.npm_config_remote_name,
  on_port: process.env.npm_config_on_port
};

const capitalize = function (str) {
  return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
};

/**
 * If port is not provided, throw an error
 */
if (!variables.on_port) {
  throw new Error(
    'Port is missing, add on_port argument, make sure to -- before it, like -- on_port={PORT}'
  );
}

/**
 * If name is not provided, throw an error
 */
if (!variables.remote_name) {
  throw new Error(
    'Remote name is missing, add remote_name argument, make sure to -- before it, like -- remote_name={NAME}'
  );
}

/**
 * Webpack dev file that will be created on this remote
 */
const WEBPACK_DEV = `
// @ts-nocheck
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const { merge } = require('webpack-merge');
const resolve = require('resolve');
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
        port: ${variables.on_port},
        historyApiFallback: true,
        client: {
          overlay: {
            errors: true,
            warnings: false
          }
      }
    },
     output: {
        publicPath: 'http://localhost:${variables.on_port}/'
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    plugins: [    new MFLiveReloadPlugin({
      port: 3000,
      container: 'container'
    }),new ModuleFederationPlugin(
        {
            name: '${variables.remote_name.toLowerCase()}',
            filename:
                'remoteEntry.js',
            exposes: {
                './${capitalize(
                  variables.remote_name
                )}App': './src/bootstrap_${variables.remote_name.toLowerCase()}'
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
`;

/**
 * Webpack prod file that will be created on this remote
 */
const WEBPACK_PROD = `
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const { merge } = require('webpack-merge');
const fs = require("fs");
const path = require("path");

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
            name: '${variables.remote_name.toLowerCase()}',
            filename:
                'remoteEntry.js',
            exposes: {
                './${capitalize(variables.remote_name)}App': './src/bootstrap'
            },
            shared: packageJson.dependencies,
        }
    ),new HtmlWebpackPlugin({ template: './public/index.html' })],
}; module.exports = merge(commonConfig, prodConfig);
`;

const IMPORT_INDEX = `// @ts-nocheck
import('./bootstrap_${variables.remote_name}')
  .then(({ mount }) => {
    if (process.env.NODE_ENV === 'development') {
      const devRoot = document.querySelector('#root');

      if (devRoot) {
        mount(devRoot);
      }
    }
  })
  .catch((err) => console.error(err));
`;

/**
 * Boilerplate code for container remote .tsx file
 */
const REMOTE_BOILERPLATE = `import React, { useRef, useEffect } from 'react';
        import messagingService from '@core/utils/messagingService';

        export default (): JSX.Element => {
          const ref = useRef(null);

          useEffect(() => {
            import('${variables.remote_name.toLowerCase()}/${capitalize(variables.remote_name)}App')
              .then(({ mount }) => mount(ref.current, { subscribe: messagingService.subscribe, sendMessageToHost: messagingService.sendMessageToHost }))
              .catch(() => {
                throw new Error('${capitalize(variables.remote_name)} remote failed to load!');
              });
          }, []);

          return <div ref={ref} />;
        };
`;

/**
 * Boilerplate code for container remote .ts file
 */
const REMOTE_BOILERPLATE_INDEX = `import ${capitalize(
  variables.remote_name
)}Remote from './${capitalize(variables.remote_name)}Remote';

       export default ${capitalize(variables.remote_name)}Remote;`;

/**
 * CSS Module style declaration for typescript
 */
const CSS_MODULE_STYLE_DECLARATION = `declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export = classes;
}
`;

/**
 * Check if file with provided name already exists
 */
if (
  !fs.existsSync(`${rootDir}/remotes/${variables.remote_name}`) &&
  !fs.existsSync(`${rootDir}/remotes/${capitalize(variables.remote_name)}`)
) {
  // Create directory with capitalized remote name
  fs.mkdirSync(`${rootDir}/remotes/${capitalize(variables.remote_name)}`);

  // Copy content from remoteAppSample and paste it to above created directory
  fs.copy(
    `${rootDir}/container/scripts/remoteAppSample`,
    `${rootDir}/remotes/${capitalize(variables.remote_name)}`,
    () => {
      fs.rename(
        `${rootDir}/remotes/${capitalize(variables.remote_name)}/src/bootstrap.tsx`,
        `${rootDir}/remotes/${capitalize(variables.remote_name)}/src/bootstrap_${
          variables.remote_name
        }.tsx`
      );

      fs.removeSync(`${rootDir}/remotes/${capitalize(variables.remote_name)}/src/index.ts`);

      fs.outputFile(
        `${rootDir}/remotes/${capitalize(variables.remote_name)}/src/index.ts`,
        IMPORT_INDEX,
        function (err) {
          if (err) {
            throw new Error(err);
          }
        }
      );
    }
  );

  // If there is webpack dev file, remove it because new one will be created
  fs.removeSync(`${rootDir}/remotes/${capitalize(variables.remote_name)}/config/webpack.dev.js`);

  // Create webpack dev file with the right configuration
  fs.outputFile(
    `${rootDir}/remotes/${capitalize(variables.remote_name)}/config/webpack.dev.js`,
    WEBPACK_DEV,
    function (err) {
      if (err) {
        throw new Error(err);
      }
    }
  );

  // Create webpack prod file with the right configuration
  fs.outputFile(
    `${rootDir}/remotes/${capitalize(variables.remote_name)}/config/webpack.prod.js`,
    WEBPACK_PROD,
    function (err) {
      if (err) {
        throw new Error(err);
      }
    }
  );

  /**
   * Check if this remote folder exists in container remotes directory
   */
  if (
    !fs.existsSync(`${rootDir}/container/src/remotes/${capitalize(variables.remote_name)}Remote`)
  ) {
    // Create remote directory in container
    fs.mkdirSync(`${rootDir}/container/src/remotes/${capitalize(variables.remote_name)}Remote`);

    // Create tsx file for this remote with the right boilerplate
    fs.outputFile(
      `${rootDir}/container/src/remotes/${capitalize(variables.remote_name)}Remote/${capitalize(
        variables.remote_name
      )}Remote.tsx`,
      REMOTE_BOILERPLATE,
      function (err) {
        if (err) {
          throw new Error(err);
        }
      }
    );

    // Create ts file for this remote with the right boilerplate
    fs.outputFile(
      `${rootDir}/container/src/remotes/${capitalize(variables.remote_name)}Remote/index.ts`,
      REMOTE_BOILERPLATE_INDEX,
      function (err) {
        if (err) {
          throw new Error(err);
        }
      }
    );
  }

  // Get the content of packageJSON ( needed to append the right scripts )
  const packageJSON = fs.readJsonSync('./package.json');
  const remotes = fs.readdirSync('../remotes/');

  if (packageJSON) {
    fs.writeJsonSync(
      './package.json',
      Object.assign(packageJSON, {
        scripts: {
          ...packageJSON.scripts,
          [`remotes:${variables.remote_name.toLowerCase()}`]: `concurrently -n "${variables.remote_name.toLowerCase()},container"  -c "bgBlue.bold,bgMagenta.bold,bgGreen.bold" "cd ../remotes/${capitalize(
            variables.remote_name
          )} && npm run start" "npm run start"`,
          test_environment: `concurrently -n "${remotes
            .map((singleRemote) => singleRemote.toLowerCase())
            .toString()},container"  -c "bgBlue.bold,bgMagenta.bold,bgGreen.bold,bgRed.bold,bgYellow.bold,bgCyan.bold,bgWhite.bold" ${remotes
            .map((singleRemote) => `\"cd ../remotes/${capitalize(singleRemote)} && npm run start\"`)
            .join(' ')} "npm run start"`
        }
      })
    );
  }

  // Typescript declaration file
  const TS_REMOTES = fs.readFileSync(`${rootDir}/container/src/remotes/remotes-mf.ts`);

  // Add additional declaration to typscript file
  fs.writeFile(
    `${rootDir}/container/src/remotes/remotes-mf.ts`,
    `${TS_REMOTES} declare module '${variables.remote_name.toLowerCase()}/${capitalize(
      variables.remote_name
    )}App';`,
    function (err) {
      if (err) {
        throw new Error(err);
      }
    }
  );

  // Add TS CSS Module support
  fs.writeFile(
    `${rootDir}/remotes/${capitalize(variables.remote_name)}/styles_declaration.d.ts`,
    CSS_MODULE_STYLE_DECLARATION,
    function (err) {
      if (err) {
        throw new Error(err);
      }
    }
  );

  console.info('\x1b[32mJob succeeded.');
  console.info('');
  console.info('\x1b[31mIMPORTANT:\x1b[0m');
  console.info('There are few more steps to do:');
  console.info(
    ` 1. Please add the line bellow to ModuleFederation remotes in ${rootDir}/container/config/webpack.dev.js`
  );
  console.info(
    ` \x1b[33m "${variables.remote_name.toLowerCase()}": "${variables.remote_name.toLowerCase()}@http://localhost:${
      variables.on_port
    }/remoteEntry.js"\x1b[0m`
  );
  console.info(
    ` 2. Please add the line bellow to ModuleFederation remotes in ${rootDir}/container/config/webpack.prod.js`
  );
  console.info(
    ` \x1b[33m "${variables.remote_name.toLowerCase()}": "${variables.remote_name.toLowerCase()}@http://{__DOMAIN_NAME__}:${
      variables.on_port
    }/remoteEntry.js"\x1b[0m`
  );
  console.info(
    ` 3. Switch to ${rootDir}/remotes/${capitalize(variables.remote_name)} and run npm install.`
  );
  console.info(' ');
  console.info('Thats it, you can now import the component anywhere using:');
  console.info(
    ` \x1b[33m import ${capitalize(variables.remote_name)}Remote from "@core/remotes/${capitalize(
      variables.remote_name
    )}Remote"\x1b[0m`
  );
  console.info(' ');
} else {
  throw new Error(`Directory with name ${variables.remote_name} already exists.`);
}
