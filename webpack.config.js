const webpack = require('webpack');
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },

  mode: 'development',

  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, './build'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'React-App',
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY': JSON.stringify(
        'AIzaSyAql4LCfbnzfp_bBZqv-f_5Km2RgJucBys'
      ),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
        'cover-letter-maker.firebaseapp.com'
      ),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify('cover-letter-maker'),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
        'cover-letter-maker.appspot.com'
      ),
      'process.env.FIREBASE_MESSAGING_SENDER_ID':
        JSON.stringify('261830690164'),
      'process.env.FIREBASE_APP_ID': JSON.stringify(
        '1:261830690164:web:c2b2f3feb6180a836a5821'
      ),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              minimizerOptions: {
                plugins: [
                  ['gifsicle', { interlaced: true }],
                  ['jpegtran', { progressive: true }],
                  ['optipng', { optimizationLevel: 5 }],
                  ['svgo', { plugins: [{ removeViewBox: false }] }],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
        ],
      },
    ],
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
};
