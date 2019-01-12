const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin')

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].[chunkhash].js'
    },
    devServer: {
        open: true,
        compress: true,
        port: 4000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new MiniCssExtractPlugin({
            filename: 'static/styles/[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/public/index.html'
        }),
        /* enable ONLY when HMR can be used for all dev assets */
        // new webpack.HotModuleReplacementPlugin()
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true,
            svgoConfig: {
                removeTitle: false,
                removeViewBox: true,
            },
        })
    ]
}