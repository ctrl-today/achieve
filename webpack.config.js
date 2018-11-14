const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
  entry: ['babel-polyfill', './src/index.js'],
  mode: (env.dev? 'development':'production'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
      	test: /\.sass$/,
        exclude: /node_modules/,
      	use: ['style-loader', { 
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            sourceMap: env.dev
          }
        }, {
          loader: 'sass-loader',
          options: {sourceMap: env.dev}
        }]
      },
      {
      	test: /\.css$/,
      	use: ['style-loader', { 
          loader: 'css-loader',
        }]
      }
    ],

  },
  devtool: env.dev? 'source-map':undefined,
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
           filename: 'index.html',
           template: './src/index.html'
       }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
});
