const webpack = require('webpack');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const ngcWebpack = require('ngc-webpack');
const autoprefixer = require('autoprefixer');

// Defining environment variable at client side
const NODE_ENV = process.env.NODE_ENV || 'development';
const serverConfig = require('../../config').getConfig('server');

const EVENT = process.env.npm_lifecycle_event || '';
const AOT = EVENT.includes('aot');

console.info(`\n ***** Webpack runs on ${NODE_ENV} environment ****** \n`);

module.exports = {

  entry: {
    polyfills: './client/polyfills.ts',
    vendor: './client/vendor.ts',
    app: (AOT ? './client/main.aot.ts' : './client/main.ts')
  },

  resolve: {
    extensions: ['.js', '.ts', '.json']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: AOT ? 'tsconfig.aot.json' : 'tsconfig.json'
            }
        },
        {
            loader: 'angular2-template-loader'
        },
        {
            loader: 'angular-router-loader?genDir=compiled&aot=' + AOT
        }
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: [helpers.root('client/index.html')]
      },

      {
        test: /\.scss$/,
        loaders: ['to-string-loader', 'css-loader?localIdentName=[local]', 'postcss-loader', 'sass-loader']
      },

      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader?localIdentName=[local]', 'postcss-loader']
      },

      {
        test: /\.(jpg|png|gif|ico)$/,
        use: 'file-loader?name=[name].[ext]'
      },

      {
        test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
        use: 'file-loader'
      }
    ]

  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV),
        'apiUrl': JSON.stringify(serverConfig.apiURL)
      }
    }),
    new CheckerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills', 'markerclusterer']
    }),

    new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
          autoprefixer(),
        ]
      }
    }),

    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),

     new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('client'), {}
    ),

    new ngcWebpack.NgcWebpackPlugin({
      disabled: !AOT,
      tsConfig: AOT ? helpers.root('../tsconfig.aot.json') : helpers.root('../tsconfig.json'),
    }),

  ]
};