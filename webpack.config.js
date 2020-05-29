const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
   context: path.resolve(__dirname, 'src'),
   entry: ['@babel/polyfill', './index.js'],
   mode: 'development',
   output: {
      filename: devMode ? 'bundle.js' : 'bundle.[hash].js',
      path: path.resolve(__dirname, 'dist')
   },
   resolve: {
      extensions: ['.js'],
      alias: {
         '@': path.resolve(__dirname, 'src'),
         '@core': path.resolve(__dirname, 'src/core')
      }
   },
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
      hot: true
   },
   plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
         filename: devMode ? 'bundle.css' : 'bundle.[hash].css',
      }),
      new CopyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, 'src/favicon.ico'),
               to: path.resolve(__dirname, 'dist')
            }
         ],
      }),

      new HtmlWebpackPlugin({
         template: './index.html',
         minify: {
            collapseWhitespace: !devMode,
            removeComments: !devMode
         }
      })

   ],
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     hmr: devMode,
                     reloadAll: true
                  },
               },
               'css-loader',
               'sass-loader',
            ],
         },
         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-class-properties']
               }
            }
         }
      ]
   },
};