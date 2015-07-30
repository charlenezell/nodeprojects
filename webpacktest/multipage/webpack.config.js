var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  entry: {
    page1: ["webpack/hot/dev-server", "./page1.js"],
    page2: ["webpack/hot/dev-server", "./page2.js"],
    vendor: ["jquery", "underscore"],
    uiModules:["./module1"]
  },
  output: {
    // path: "build/",
    publicPath: "/assest/",
    path:"./build",
    filename: "[name].entry.js",
    chunkFilename: "[chunkhash].bundle.js"
  },
  extensions: ['', '.coffee', '.js'],
  module: {
    loaders: [{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }, // use ! to chain loaders
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css')
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.CommonsChunkPlugin("common.js",["vendor"]),
    new webpack.optimize.CommonsChunkPlugin("uicommon.js",["uicommon"])
    /*new webpack.optimize.UglifyJsPlugin()*/
  ]
};
