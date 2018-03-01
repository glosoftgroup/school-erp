var webpack = require('webpack');
const path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        'academic_year': './app_dir/static/js/academic_year/',
        'academic_year': './app_dir/static/js/academic_year/',
        'classes': './app_dir/static/js/academics/classes/',
        'dashboard': './app_dir/static/js/',
        'parent': './app_dir/static/js/parent/',
        'room': './app_dir/static/js/room/',
        'site': './app_dir/static/js/site/',
        'stream': './app_dir/static/js/academics/stream/',
        'student': './app_dir/static/js/student/',
        'term': './app_dir/static/js/term/',
        'users': './app_dir/static/js/users/'
    },
    output: {
        path: path.resolve('./app_dir/static/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, loader: 'vue-loader', options: {
            			extractCSS: true,
						optimizeSSR: false
             },
            },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('./app_dir/static'),
        }
     },
    plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new BundleTracker({filename: './webpack-stats.json'}),
            new ExtractTextPlugin("styles.css"),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery'
              })
        ],
     target: 'node',
//     externals: [nodeExternals()],
//     devtool: 'inline-cheap-module-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

//if (process.env.NODE_ENV === 'test') {
//  // exclude NPM deps from test bundle
//  module.exports.externals = [require('webpack-node-externals')()]
//  // use inline source map so that it works with mocha-webpack
//  module.exports.devtool = 'inline-cheap-module-source-map'
// }