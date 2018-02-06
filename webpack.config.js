var webpack = require('webpack');
const path = require('path');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: {
        'dashboard': './app_dir/static/js/'
    },
    output: {
        path: path.resolve('./app_dir/static/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}
        ]
    },
    plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new BundleTracker({filename: './webpack-stats.json'})
        ],
    target: 'node'
}
