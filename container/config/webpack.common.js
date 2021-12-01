// @ts-nocheck
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },

      /*
      FONTS
      -----
      * Copies fonts found within the `src` tree to the `dist` folder
      * Keeps the original file name
      */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },

      /*
       *
       */
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },

      /*
        IMAGES
        ------
        * Copies fonts found within the `src` tree to the `dist` folder
        * Keeps the original file name
      */
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },

      {
        test: /\.module\.(scss|sass)$/,
        use: [
          { loader:  'style-loader' },
          { loader:  'css-loader',   options: {
            modules:  {
              localIdentName:'[local]_[hash:base64:5]'
            },
          } },
          {
            loader: 'sass-loader',
          }
        ]
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    alias: {
      '@core': path.resolve( 'src'),
      '@ts': path.resolve('src/ts')
    }
  },
};
