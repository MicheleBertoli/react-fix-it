const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  entry: './demo/entry',

  output: {
    path: './build',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin()],

}
