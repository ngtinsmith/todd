process.traceDeprecation = true;

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin')
// const url = 'node_modules/jam-icons/svg/'

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].[hash].js',
    },
    devServer: {
        open: true,
        compress: true,
        port: 4000,
    },
    /* Devtool SourceMaps
     * 
     * dev  - eval-source-map
     *        cheap-module-eval-source-map 
     * prod - source-map
     *        inline-source-map
     **/
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sc|sa|c)ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    { 
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    { 
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },

            /* Image/Rasterized Asset Loader */
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/',
                            publicPath: 'assets/images/',
                        }
                    } 
                ]
            },

            /* SVG Loader
             * 
             * [path] = relative to template url: 
             * e.g, if template is in src/public/index.html then [path] = src/public/
             * [path] is prefixed to "name" to allow html template
             * pre-parsing with inline-svg-plugin
             * 
             * emitFile: false since we don't need to write/emit assets on the
             * final build, we are handling that with inline-svg-plugin instead
             **/
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            emitFile: false
                        }
                    } 
                ]
            },

            /* Font Loader */
            {
                test: /\.(woff|woff2|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts/',
                            publicPath: 'assets/fonts/'
                        },
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            }
              
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/public/index.html'
        }),
        new HtmlWebpackInlineSVGPlugin({
            /* runPreEmit: true so it'll run "before" the html
             * template is parsed by html-webpack-plugin
             **/
            runPreEmit: true,
            svgoConfig: {
                removeTitle: false,
                removeViewBox: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'static/styles/[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),
        /* enable ONLY when HMR can be used for all assets - to test on UX part */
        // new webpack.HotModuleReplacementPlugin()
    ]
}