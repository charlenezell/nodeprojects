var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var AssetsPlugin         = require('assets-webpack-plugin');
// var assetsPluginInstance = new AssetsPlugin();
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  entry: {
    page1: [ /*"webpack/hot/dev-server", */ "./page1.js"],
    page2: [ /*"webpack/hot/dev-server", */ "./page2.js"],
    vendor: ["jquery", "underscore"],
    uicommon: ["./module1", "./module2.es6"]
  },
  output: {
    // path: "build/",
    publicPath: "/asset/",
    path: "./build/asset/",
    filename: "[name].entry.[hash].js",
    chunkFilename: "[name].[id].[chunkhash].js"
  },
  extensions: ['', '.coffee', '.js', '.es6'],
  module: {
    loaders: [{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader','css!sass')
      }, // use ! to chain loaders
      {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }, {
        test: /\.es6$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("source-map![name].[hash].css"),
    new webpack.optimize.CommonsChunkPlugin("common.[hash].js", ["vendor"]),
    new webpack.optimize.CommonsChunkPlugin("uicommon.[hash].js", ["uicommon"]),
    new HtmlWebpackPlugin({
      title:'page1',
      filename:"page1.html",
      template:'template.html',
      inject:'body',
      chunks:['vendor','uicommon','page1']
    }),

    /*new webpack.optimize.UglifyJsPlugin()*/
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname,  "stats.json"),
          JSON.stringify(stats.toJson()));
      });
    }
  ]
};
