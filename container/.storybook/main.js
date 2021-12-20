const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false
        }
      }
    }
  ],

  core: {
    builder: 'webpack5'
  },

  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@core': path.resolve(__dirname, '../src')
    };

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
  }
};
