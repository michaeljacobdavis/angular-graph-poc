var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  cache: true,
  context: path.join(__dirname, 'source'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: 'bundle.[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js(x|)?$/,
        include: path.join(__dirname, 'client'),
        loaders: ['babel-loader?optional=runtime&stage=1']
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'client'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new CleanPlugin(['dist']),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.SourceMapDevToolPlugin(
      '../map/bundle.[hash].js.map',
      '\n//# sourceMappingURL=http://127.0.0.1:3001/dist/map/[url]'
    )
  ]
};
