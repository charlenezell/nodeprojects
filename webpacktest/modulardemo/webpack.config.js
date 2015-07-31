var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var AssetsPlugin         = require('assets-webpack-plugin');
// var assetsPluginInstance = new AssetsPlugin();
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  entry: {
    page1: [ /*"webpack/hot/dev-server", */ "./entry/page1.js"],
    page2: [ /*"webpack/hot/dev-server", */ "./entry/page2.js"],
    page3: [ /*"webpack/hot/dev-server", */ "./entry/page3.js"],
    lib: ["jquery", "underscore"]
    /*uicommon: ["./module1", "./module2.es6"]*/
  },
  output: {
    // path: "build/",
    publicPath: "http://mynode.100bt.com/webpacktest/modulardemo/dest/assets/",
    path: "./dest/assets/",
    filename: "[name]-[hash].js",
    chunkFilename: "[name].[id].[chunkhash].js"
  },
  /*extensions: ['', '.coffee', '.js'],*/
  module: {
    loaders: [{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader','css!sass')
      }, // use ! to chain loaders
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader','css')
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
    new ExtractTextPlugin("[name]-[hash].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      chunks:["lib"]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:"common",
      filename:"common-[hash].js",
      chunks:["page1","page2"]
    }),
    /*new webpack.optimize.CommonsChunkPlugin("vendor-[hash].js", ["vendor"]),
    new webpack.optimize.CommonsChunkPlugin("commoncss-[hash].css", ["commoncss"]),*/
    new HtmlWebpackPlugin({
      title:'page1',
      filename:"../page1.html",
      template:'./entry/template.html',
      inject:'body',
      chunks:["page1","common",'vendor']
    }),
    new HtmlWebpackPlugin({
      title:'page2',
      filename:"../page2.html",
      template:'./entry/template.html',
      inject:'body',
      chunks:["page2","common",'vendor']
    })/*,
    new webpack.optimize.UglifyJsPlugin()
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname,  "stats.json"),
          JSON.stringify(stats.toJson()));
      });
    }*/
  ]
};
