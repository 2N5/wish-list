const path = require('path'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist')
};

module.exports = {
  entry: PATHS.src + '/index.js',
  output: {
    filename: '[name].js',
    path: PATHS.dist,
    publicPath: '/dist'
  },
  module: {
    rules: [{
        test: /.s[ac]ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 'css-loader'],
      }
    ]
  },
  devServer: {
    overlay: true,
    stats: 'errors-only'

  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ]
};