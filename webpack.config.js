var webpack = require('webpack');
const path = require('path');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: {
        'dashboard': './app_dir/static/js/',
        'site': './app_dir/static/js/site/',
        'users': './app_dir/static/js/users/',
        'room': './app_dir/static/js/room/',
        'academic_year': './app_dir/static/js/academic_year/',
        'stream': './app_dir/static/js/academics/stream/'
    },
    output: {
        path: path.resolve('./app_dir/static/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
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
