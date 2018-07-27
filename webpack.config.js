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
        'fee': './app_dir/static/js/finance/fee/',
        'fee_view': './app_dir/static/js/finance/fee_view/',
        'academic_year': './app_dir/static/js/academic_year/',
        'attendance': './app_dir/static/js/attendance/',
        'classes': './app_dir/static/js/academics/classes/',
        'class_allocation': './app_dir/static/js/workload/class_allocation/',
        'classes': './app_dir/static/js/academics/classes/',
        'configuration': './app_dir/static/js/exams/configuration/',
        'curriculum': './app_dir/static/js/academics/curriculum/',
        'dashboard': './app_dir/static/js/',
        'finance_item': './app_dir/static/js/finance/item/',
        'finance_item_edit': './app_dir/static/js/finance/item_edit/',

        'fee_list': './app_dir/static/js/finance/fee_list/',
        'house': './app_dir/static/js/house/',
        'parent': './app_dir/static/js/parent/',
        'room': './app_dir/static/js/room/',
        'site': './app_dir/static/js/site/',
        'stream': './app_dir/static/js/academics/stream/',
        'student': './app_dir/static/js/students/create',
        'student_fee': './app_dir/static/js/students/fee_list',
        'student_view': './app_dir/static/js/students_view/',
        'term': './app_dir/static/js/term/',
        'marks_allocation': './app_dir/static/js/exams/marks_allocation/',
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
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}

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
            new ExtractTextPlugin("[name].css"),
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