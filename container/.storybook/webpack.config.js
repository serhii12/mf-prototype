// const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: /\.module\.scss$/
  });

  config.module.rules.push({
    test: /\.module\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  });

  config.module.rules.push({
    test: /\.(png|svg|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader'
      }
    ],
    type: 'javascript/auto'
  });

  config.resolve['alias'] = {
    '@core': '../src'
  };

  config.resolve['extensions'] = [
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.css',
    '.scss',
    '.jpg',
    '.gif',
    '.jpeg',
    '.png'
  ];

  return config;
};
