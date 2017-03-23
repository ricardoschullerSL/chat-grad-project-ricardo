
var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require("path");

module.exports = {
    context: __dirname + "/public",
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/main.js",
    module: {
        loaders: [
        {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            query: {
                presets: ["react", "es2015", "stage-0"],
                plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
                }
            }
        ]
    },
    output: {
        path: __dirname + "/public/",
        filename: "client.min.js"
    },
    plugins: debug ? [] :[
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    devServer:{
        proxy: {
            "/api": {
                target: "http://localhost:9090/",
            }
        }
    }
};
