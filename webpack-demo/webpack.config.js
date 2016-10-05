var debug = process.env.NODE_ENV !== "PROD"; // cmd: SET NODE_ENV=development && webpack
var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    context: path.join(__dirname, 'App'),
    entry: './main.js',
    resolve: {
        extensions: ['', '.js', 'min.js'],
        alias: {
            "jquery": path.resolve("Scripts/kendo/2016.3.914/jquery.min.js"),
            v: path.join(__dirname, 'App/views'),
            k: path.resolve("Scripts/kendo/2016.3.914") 
        },
        root: [
                path.resolve('.'),
                path.resolve('./Scripts/kendo/2016.3.914/') // the path to the minified scripts
        ]
    },
    output: {
        path: path.join(__dirname, 'Built'),
        filename: debug ? '[name].bundle.js' : '[name].bundle.min.js'
    },
    plugins: debug ? [
        new WebpackNotifierPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ] : [
        new WebpackNotifierPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ],
    module: {
        loaders: [
            { test: /\.css$|\.min.css$/, loader: "style!css" },
            { test: /.(png|woff(2)?|eot|ttf|gif|svg|jpeg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' }
            //{ test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/, loader: "url" }
        ]
    }
    
};
